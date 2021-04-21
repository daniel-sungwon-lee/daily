import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField,
         Grow, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
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

export default function New(props) {
  const classes = useStyles();
  const { open, setOpen } = props;
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

    fetch('/api/routines', {
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

            <div className="mb-2">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>

                <KeyboardTimePicker label="From" placeholder="3:00 PM" mask="__:__ _M"
                 value={from} onChange={date => setFrom(date)} required InputLabelProps={{ required: false }} />
                <KeyboardTimePicker label="To" placeholder="6:00 PM" mask="__:__ _M"
                 value={to} onChange={date => setTo(date)} required InputLabelProps={{ required: false }} />

              </MuiPickersUtilsProvider>
            </div>

            <TextField multiline label="Action" helperText="Ex: Code" color="secondary"
             value={action} onChange={(e) => setAction(e.target.value)} required InputLabelProps={{ required: false }} />

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
