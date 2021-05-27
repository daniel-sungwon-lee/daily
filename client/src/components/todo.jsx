import React, { useState } from 'react';
import { Dialog, Grow, TextField } from '@material-ui/core';
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

export default function Todo(props) {
  const { open, setOpen } = props
  const classes = useStyles();

  const [action, setAction] = useState('')

  return (
    <Dialog open={open} onClose={() => setOpen(false)} scroll="body"
     TransitionComponent={Grow} classes={{ paper: classes.dialog }}>
      <div className="m-3">

        <TextField required id="action" value={action} InputLabelProps={{ required: false }}
         onChange={(event) => setAction(event.target.value)} color="secondary" multiline
         fullWidth />

      </div>
    </Dialog>
  )
}
