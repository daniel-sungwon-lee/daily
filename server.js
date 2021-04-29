require('dotenv/config');
const express = require('express');
const pg = require('pg');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const path = require('path');
const port = process.env.PORT || 3001;

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

//static-middleware
const publicPath = path.join(__dirname, 'public');
const staticMiddleware = express.static(publicPath);

app.use(staticMiddleware);

app.use(express.json());

//client-error
class ClientError {
  constructor(status, message) {
    this.status = status;
    this.message = message;
  }
}

//error-middleware
function errorMiddleware(err, req, res, next) {
  if (err instanceof ClientError) {
    res.status(err.status).json({
      error: err.message
    });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
}

//API endpoints

//auth
app.post('/api/signup', (req, res, next) => {
  const { email, password } = req.body;

  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
     insert into "users" ("email", "hashedPassword")
     values ($1, $2)
     `;
      const params = [email, hashedPassword];

      db.query(sql, params)
        .then(result => {
          res.status(201).json(result.rows[0]);
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

app.post('/api/login', (req, res, next) => {
  const { email, password } = req.body;

  const sql = `
  select "userId", "hashedPassword", "email"
  from "users"
  where "email" = $1
  `;
  const params = [email];

  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'Invalid login');
      }
      const { userId, hashedPassword, email } = user;
      argon2
        .verify(hashedPassword, password)
        .then(isMatch => {
          if (!isMatch) {
            throw new ClientError(401, 'Invalid login');
          }
          const payload = { userId, email };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.json({ token, user: payload });
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

//add new
app.post('/api/routines', (req, res, next) => {
  const { from, to, action } = req.body;

  const sql = `
  insert into "routines" ("from", "to", "action")
  values ($1, $2, $3)
  `;
  const params = [from, to, action]

  db.query(sql, params)
    .then(result => {
      res.status(201).json(result.rows[0])
    })
    .catch(err => next(err))
})

//home
app.get('/api/routines', (req, res, next) => {

  const sql= `
  select * from "routines"
  order by "from"
  `;

  db.query(sql)
    .then(result => res.status(200).json(result.rows))
    .catch(err => next(err));
})

//edit
app.get('/api/routines/:id', (req, res, next) => {
  const { id } = req.params

  const sql = `
  select * from "routines"
  where "id" = $1
  `;
  const params = [id]

  db.query(sql, params)
    .then(result => res.status(200).json(result.rows[0]))
    .catch(err => next(err));
})

app.patch('/api/routines/:id', (req, res, next) => {
  const { id } = req.params
  const { from, to, action } = req.body

  const sql = `
  update "routines"
  set "from" = $2,
      "to" = $3,
      "action" = $4
  where "id" = $1
  `
  const params = [id, from, to, action]

  db.query(sql, params)
    .then(result => {
      res.status(200).json(result.rows[0])
    })
    .catch(err => next(err))
})

//delete
app.delete('/api/routines/:id', (req, res, next) => {
  const { id } = req.params

  const sql = `
  delete from "routines"
  where "id" = $1
  `
  const params = [id]

  db.query(sql, params)
    .then(result => {
      res.status(204).json(result.rows[0])
    })
    .catch(err => next(err));
})

//for Heroku deployment
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}


app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`express server listening on ${port}`)
})
