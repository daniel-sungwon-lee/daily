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

  return (
    <Dialog open={open} onClose={() => setOpen(false)} classes={{ paper: classes.dialog }}
     scroll="body" TransitionComponent={Grow}>
      <div className="m-3">

        <DialogTitle>
          New Daily Routine
        </DialogTitle>

        <form>
          <DialogContent>

            <div>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>

                <KeyboardTimePicker label="From" placeholder="3:00 PM" mask="__:__ _M"
                 value={from} onChange={date => setFrom(date)} />
                <KeyboardTimePicker label="To" placeholder="6:00 PM" mask="__:__ _M"
                 value={to} onChange={date => setTo(date)} />

              </MuiPickersUtilsProvider>
            </div>

            <TextField multiline label="Action" helperText="Ex: Code personal projects" color="secondary" />

          </DialogContent>

          <DialogActions>

            <Button color="secondary" classes={{ text: classes.button }}
            onClick={() => setOpen(false)}>
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
