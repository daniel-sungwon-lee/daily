import React from 'react';
import { AppBar, Toolbar, Zoom } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  nav: {
    backgroundColor: "#788DFF"
  }
})

export default function Nav(props) {
  const classes = useStyles()

  return (
    <Zoom in>
      <div className="mb-5">
        <AppBar position="sticky" classes={{root: classes.nav}}>
          <Toolbar className="justify-content-between">

            <a href="/" className="text-decoration-none">
              <div>
                <img src="images/daily.svg" alt="Daily logo" width="65" />
              </div>
            </a>

          </Toolbar>
        </AppBar>
      </div>
    </Zoom>
  )
}
