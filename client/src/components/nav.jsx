import React from 'react';
import { AppBar, Fade, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  nav: {
    backgroundColor: "#788DFF"
  }
})

export default function Nav(props) {
  const classes = useStyles()

  return (
    <Fade in>
      <div className="mb-5">
        <AppBar position="sticky" classes={{root: classes.nav}}>
          <Toolbar className="justify-content-between">

            <a href="/" className="text-decoration-none">
              <div>
                <img src="images/daily.svg" alt="Daily logo" width="65" />
              </div>
            </a>

            <div className="d-flex">
              <p className="mx-3 my-0 nav-p">
                new routine
              </p>
              <p className="mx-3 my-0 nav-p">
                info
              </p>
              <a href="#top" className="text-decoration-none mx-3 nav-p">
                top
              </a>
            </div>

          </Toolbar>
        </AppBar>
      </div>
    </Fade>
  )
}
