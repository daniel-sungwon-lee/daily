import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField,
         Grow, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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

  return (
    <Dialog open={open} onClose={() => setOpen(false)} classes={{ paper: classes.dialog }}
     scroll="body" TransitionComponent={Grow}>
      <div className="m-3">

        <DialogTitle>
          New Daily Routine
        </DialogTitle>

        <form>
          <DialogContent>
            <TextField multiline label="Action" helperText="Ex: Work" color="secondary" />
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
