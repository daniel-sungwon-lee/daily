import React, { useState } from 'react';
import { AppBar, Fade, Popover, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import New from './new';

const useStyles = makeStyles({
  nav: {
    backgroundColor: "#788DFF"
  },
  popover: {
    width: "14rem",
    marginTop: "1.1rem"
  }
})

export default function Nav(props) {
  const { user, handleSignOut } = props;
  const classes = useStyles()
  const [info, setInfo] = useState(false)
  const [anchor, setAnchor] = useState(null)
  const [open, setOpen] = useState(false)

  const handleInfo = (event) => {
    setAnchor(event.currentTarget)
    setInfo(true)
  }

  return (
    <Fade in>
      <div className="mb-5 sticky-top">
        <AppBar position="sticky" classes={{root: classes.nav}}>
          <Toolbar className="justify-content-between">

            <a href="/" className="text-decoration-none mx-2">
              <div>
                <img src="images/daily.svg" alt="Daily logo" width="65" />
              </div>
            </a>

            <div className="d-flex mx-2">

              <p className="mr-2 my-0 nav-p" onClick={() => setOpen(true)}>
                new
              </p>
              <New open={open} setOpen={setOpen} user={user} />

              <p className="mx-4 my-0 nav-p" onClick={handleInfo}>
                info
              </p>

              <Popover open={info} anchorEl={anchor} onClose={() => setInfo(false)}
               anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} classes={{paper: classes.popover}}>
                <p className="my-3 mx-4">
                  Daily helps you create and schedule your daily routine; create a new
                  routine now!
                </p>
              </Popover>

              <p className="ml-2 my-0 nav-p" onClick={handleSignOut}>
                logout
              </p>

            </div>

          </Toolbar>
        </AppBar>
      </div>
    </Fade>
  )
}
