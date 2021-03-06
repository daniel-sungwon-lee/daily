import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField,
         Grow, Button, createMuiTheme } from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

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

const customTimeTheme = createMuiTheme({
  overrides: {
    MuiPaper: {
      rounded: {
        borderRadius: "1rem"
      }
    },
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: "#788DFF"
      }
    },
    MuiButton: {
      textPrimary: {
        color: "#4F5DFF",
        textTransform: "lowercase",
        fontSize: "16px",
        borderRadius: "0.5rem"
      }
    },
    MuiPickersClock: {
      pin: {
        backgroundColor: "#4F5DFF"
      }
    },
    MuiPickersClockPointer: {
      pointer: {
        backgroundColor: "#4F5DFF"
      },
      thumb: {
        border: "14px solid #4F5DFF"
      },
      noPoint: {
        backgroundColor: "#4F5DFF"
      }
    }
  }
})

export default function New(props) {
  const classes = useStyles();
  const { open, setOpen } = props;
  const { userId } = props.user;
  const [from, setFrom] = useState(new Date())
  const [to, setTo] = useState(new Date())
  const [action, setAction] = useState('')

  const handleClose = () => {
    setAction('')
    setOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const fromTime = from.toLocaleTimeString([], { timeStyle: "short" })
    const toTime = to.toLocaleTimeString([], { timeStyle: "short" })
    const reqBody = { from: fromTime, to: toTime, action }

    fetch(`/api/routines/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reqBody)
    })
      .then(() => {
        setAction('')
        setOpen(false)
      })
      .catch(() => window.location.reload())
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)} classes={{ paper: classes.dialog }}
     scroll="body" TransitionComponent={Grow}>
      <div className="m-3">

        <DialogTitle>
          New Daily Routine
        </DialogTitle>

        <form onSubmit={handleSubmit}>
          <DialogContent>

            <div className="mb-2 d-flex justify-content-between">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <ThemeProvider theme={customTimeTheme}>

                  <KeyboardTimePicker label="From" placeholder="3:00 PM" mask="__:__ _M"
                  value={from} onChange={date => setFrom(date)} required
                  InputLabelProps={{ required: false }} fullWidth/>

                  <KeyboardTimePicker label="To" placeholder="6:00 PM" mask="__:__ _M"
                  value={to} onChange={date => setTo(date)} required
                  InputLabelProps={{ required: false }} fullWidth/>

                </ThemeProvider>
              </MuiPickersUtilsProvider>
            </div>

            <TextField multiline label="Action" helperText="Ex: Code" color="secondary"
             value={action} onChange={(e) => setAction(e.target.value)} required
             InputLabelProps={{ required: false }} fullWidth />

          </DialogContent>

          <DialogActions>

            <Button color="secondary" classes={{ text: classes.button }}
            onClick={handleClose}>
              close
            </Button>

            <Button type="submit" classes={{ text: classes.button }}
             style={{ color: "#4F5DFF" }}>
              add
            </Button>

          </DialogActions>
        </form>

      </div>
    </Dialog>
  )
}
