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
  const { open, setOpen, id } = props
  const classes = useStyles();

  const [action, setAction] = useState('')

  const handleClose = () => {
    setAction('')
    setOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const reqBody = {id, action, isComplete:false }

    fetch(`/api/detail/`, {
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
    <Dialog open={open} onClose={() => setOpen(false)} scroll="body"
     TransitionComponent={Grow} classes={{ paper: classes.dialog }}>
      <div className="m-3">

        <DialogTitle>
          Add To-Do
        </DialogTitle>

        <form onSubmit={handleSubmit}>

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

        </form>

      </div>
    </Dialog>
  )
}
