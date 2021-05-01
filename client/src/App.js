import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './components/nav';
import Progress from './components/progress';
import Home from './pages/home';
import Auth from './pages/auth';

function App() {
  const [loading, setLoading] = useState(true)

  return (
    <div className="App">
      <Router>

        <>
         {
           loading ? <Progress />
                   : <></>
         }
        </>

        <Nav />

        <Switch>

        <Route exact path="/auth">
          <Auth />
        </Route>

        <Route exact path="/">
          <Home loading={loading} setLoading={setLoading} />
        </Route>

        </Switch>
      </Router>
    </div>
  )
}

export default App;
