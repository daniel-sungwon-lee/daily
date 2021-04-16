import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './components/nav'
import Home from './pages/home';

function App() {
  const [loading, setLoading] = useState(true)

  return (
    <div className="App">
      <Router>
        <Nav loading={loading} setLoading={setLoading} />
        <Switch>

        <Route exact path="/">
          <Home loading={loading} setLoading={setLoading} />
        </Route>

        </Switch>
      </Router>
    </div>
  )
}

export default App;
