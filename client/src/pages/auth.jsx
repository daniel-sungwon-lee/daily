import React, { useState } from 'react';
import { Grow, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  dialog: {
    width: "75%",
    borderRadius: "1rem"
  },
  button: {
    textTransform: "lowercase",
    fontSize: "18px",
    borderRadius: "0.5rem"
  }
})

export default function Auth(props) {
  const classes = useStyles();
  const [page, setPage] = useState('login')
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [errText, setErrText] = useState('')

  const handleChange = (event) => {
    const { id, value } = event.target

    if (id === "email") {
      setEmail(value)
    } else {
      setPassword(value)
    }
  }

  const handleSwitch = () => {
    if (page === "login") {
      setPage("signup")
      setEmail("")
      setPassword("")
      setError(false)
      setErrText("")

    } else {
      setPage("login")
      setEmail("")
      setPassword("")
    }
  }

  const handleSignUp = (event) => {
    event.preventDefault()

    const reqBody = { email, password }

    fetch('/api/signup', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reqBody)
    })
      .then(() => {
        setPage("login")
      })
      .catch(() => window.location.reload())
  }

  const handleLogin = (event) => {
    event.preventDefault()

    const reqBody = { email, password }

    fetch('/api/login', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reqBody)
    })
      .then(res => res.json())
      .then(result => {
        if (result.error) {
          setError(true)
          setErrText(result.error)
        }

        if (result.token && result.user) {
          props.handleLogin(result)
        }
      })
      .catch(() => window.location.reload())
  }

  if(page === 'login') {
    return (
      <>
        <Grow in>
          <div className="container">

            <div className="m-3">
              <img src="/images/daily.svg" alt="LightBlb logo" width="200" />
            </div>

            <form className="d-flex flex-column align-items-center" onSubmit={handleLogin}>

              <TextField id="email" label="Email" required InputLabelProps={{ required: false }}
                type="email" value={email} className="mb-4" onChange={handleChange} error={error}
                color="secondary" />

              <TextField id="password" label="Password" required InputLabelProps={{ required: false }}
                type="password" value={password} className="mb-4" onChange={handleChange} error={error}
                helperText={errText} color="secondary" />

              <Button className="mt-2" type="submit" classes={{ text: classes.button }}
                style={{ color: "#4F5DFF" }}>
                login
              </Button>

            </form>

          </div>
        </Grow>
      </>
    )
  } else {
    return (
      <>
        <Grow>
          <div className="container">

          </div>
        </Grow>
      </>
    )
  }
}