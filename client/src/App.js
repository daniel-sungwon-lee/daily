import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './components/nav';
import Progress from './components/progress';
import Home from './pages/home';
import Auth from './pages/auth';
import decodeToken from './decodeToken';
import { SnackbarProvider } from 'notistack';

function App() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = window.localStorage.getItem("dailyUserToken")
    const user = token ? decodeToken(token) : null

    setUser(user)
  }, [])

  const handleLogin = (result) => {
    setLoading(true)
    const { user, token } = result

    setUser(user)
    window.localStorage.setItem("dailyUserToken", token)

    if (window.localStorage.getItem("dailyUserToken")) {
      window.location.pathname = "/"
    }
  }

  const handleSignOut = () => {
    window.localStorage.removeItem("dailyUserToken")
    setUser(null)
  }

  if (!user) {
    return (
      <div className="App">
        <Auth handleLogin={handleLogin} />
      </div>
    )
  }

  if (window.location.pathname === "/auth" && user) {
    window.location.pathname = "/"
  }

  return (
    <div className="App">
      <Router>

        <>
         {
           loading ? <Progress />
                   : <></>
         }
        </>

        <Nav handleSignOut={handleSignOut} user={user} />

        <Switch>

        <Route exact path="/auth">
          <Auth handleLogin={handleLogin} />
        </Route>

        <Route exact path="/">
            <SnackbarProvider maxSnack={1} preventDuplicate style={{ backgroundColor: "#4F5DFF" }}>
            <Home loading={loading} setLoading={setLoading}
            user={user} />
          </SnackbarProvider>
        </Route>

        </Switch>
      </Router>
    </div>
  )
}

export default App;
