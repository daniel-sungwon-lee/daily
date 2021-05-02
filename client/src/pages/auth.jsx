import React, { useState } from 'react';
import { Grow } from '@material-ui/core';

export default function Auth(props) {
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
        <Grow>
          <div className="container">

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
