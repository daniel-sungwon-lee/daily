import React from 'react';
import { Dialog, DialogTitle, DialogActions,
         Button, Grow } from '@material-ui/core';
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

export default function Delete(props) {
  const { open, setOpen, id } = props;
  const classes = useStyles();

  const handleDelete = () => {
    fetch(`/api/routines/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    })
      .then(() => setOpen(false))
      .catch(() => window.location.reload())
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)} scroll="body"
     TransitionComponent={Grow} classes={{ paper: classes.dialog }}>
       <div className="m-3">

         <DialogTitle>
            Delete?
         </DialogTitle>

         <DialogActions>

          <Button color="secondary" classes={{ text: classes.button }}
           onClick={() => setOpen(false)}>
            no
          </Button>

          <Button classes={{ text: classes.button }} style={{ color: "#4F5DFF" }}
           onClick={handleDelete}>
            yes
          </Button>

         </DialogActions>

       </div>
    </Dialog>
  )
}
