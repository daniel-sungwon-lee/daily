import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grow,
         TextField } from '@material-ui/core';
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

  const handleClose = () => {
    setAction('')
    setOpen(false)
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)} scroll="body"
     TransitionComponent={Grow} classes={{ paper: classes.dialog }}>
      <div className="m-3">

        <DialogTitle>
          Add Todo
        </DialogTitle>

        <DialogContent>

          <TextField required id="action" value={action} InputLabelProps={{ required: false }}
          onChange={(event) => setAction(event.target.value)} color="secondary" multiline
          fullWidth />

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


      </div>
    </Dialog>
  )
}
