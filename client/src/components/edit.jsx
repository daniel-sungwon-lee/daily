import React, { useEffect, useState } from 'react';
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

export default function Edit(props) {
  const classes = useStyles();
  const { open, setOpen, id, userId } = props;
  const [newFrom, setFrom] = useState(null)
  const [newTo, setTo] = useState(null)
  const [newAction, setAction] = useState('')

  useEffect(() => {
    fetch(`/api/routines/${userId}/${id}`)
      .then(res => res.json())
      .then(data => {
        const { from, to, action } = data

        const fromDate = new Date(`March 03 2033 ${from}`)
        const toDate = new Date(`March 03 2033 ${to}`)

        setFrom(fromDate)
        setTo(toDate)
        setAction(action)
      })
  }, [id, userId])

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const fromTime = newFrom.toLocaleTimeString([], { timeStyle: "short" })
    const toTime = newTo.toLocaleTimeString([], { timeStyle: "short" })
    const reqBody = { from: fromTime, to: toTime, action: newAction }

    fetch(`/api/routines/${userId}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reqBody)
    })
      .then(() => {
        setOpen(false)
      })
      .catch(() => window.location.reload())
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)} classes={{ paper: classes.dialog }}
      scroll="body" TransitionComponent={Grow}>
      <div className="m-3">

        <DialogTitle>
          Edit Daily Routine
        </DialogTitle>

        <form onSubmit={handleSubmit}>
          <DialogContent>

            <div className="mb-2">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <ThemeProvider theme={customTimeTheme}>

                  <KeyboardTimePicker label="From" placeholder="3:00 PM" mask="__:__ _M"
                    value={newFrom} onChange={date => setFrom(date)} required InputLabelProps={{ required: false }} />
                  <KeyboardTimePicker label="To" placeholder="6:00 PM" mask="__:__ _M"
                    value={newTo} onChange={date => setTo(date)} required InputLabelProps={{ required: false }} />

                </ThemeProvider>
              </MuiPickersUtilsProvider>
            </div>

            <TextField multiline label="Action" helperText="Ex: Code" color="secondary"
              value={newAction} onChange={(e) => setAction(e.target.value)} required InputLabelProps={{ required: false }} />

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
