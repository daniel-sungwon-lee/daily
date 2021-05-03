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

  const handleAutofill = () => {
    setEmail("demo@User")
    setPassword("somethingHard!")
  }

  if(page === 'login') {
    return (
      <>
        <Grow in>
          <div className="container">

            <div className="m-3">
              <img src="/images/daily.svg" alt="Daily logo" width="200" title="Daily" />
            </div>

            <div className="mb-5 mt-4">
              <h2>Login to your Daily account</h2>
            </div>

            <form className="d-flex flex-column align-items-center mb-4" onSubmit={handleLogin}>

              <TextField id="email" label="Email" required InputLabelProps={{ required: false }}
                type="email" value={email} className="mb-2" onChange={handleChange} error={error}
                color="secondary" />

              <TextField id="password" label="Password" required InputLabelProps={{ required: false }}
                type="password" value={password} className="mb-4" onChange={handleChange} error={error}
                helperText={errText} color="secondary" />

              <Button className="mt-2" type="submit" classes={{ text: classes.button }}
                style={{ color: "#4F5DFF" }}>
                login
              </Button>

            </form>

            <div>
              <h4 style={{ color: "#F50057" }}>New user?</h4>

              <Button classes={{ text: classes.button }} onClick={handleSwitch} className="mr-2">
                sign up
              </Button>

              <Button classes={{ text: classes.button }} className="ml-2" onClick={handleAutofill}>
                demo
              </Button>
            </div>

          </div>
        </Grow>
      </>
    )
  } else {
    return (
      <>
        <Grow in>
          <div className="container">

            <div className="m-3">
              <img src="/images/daily.svg" alt="Daily logo" width="200" title="Daily"/>
            </div>

            <div className="mb-5 mt-4">
              <h2>Create a new Daily account</h2>
            </div>

            <form className="d-flex flex-column align-items-center mb-1" onSubmit={handleSignUp}>

              <TextField id="email" label="Email" required InputLabelProps={{ required: false }}
                type="email" value={email} className="mb-2" onChange={handleChange} color="secondary" />

              <TextField id="password" label="Password" required InputLabelProps={{ required: false }}
                type="password" value={password} className="mb-4" onChange={handleChange} color="secondary" />

              <Button className="mt-2" type="submit" classes={{ text: classes.button }}
               style={{ color: "#4F5DFF" }}>
                sign up
              </Button>

            </form>

            <Button onClick={handleSwitch} classes={{ text: classes.button }}>
              back to login
            </Button>

          </div>
        </Grow>
      </>
    )
  }
}
