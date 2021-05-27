import React, { useState } from 'react';
import { Dialog, Grow, TextField } from '@material-ui/core';

export default function Todo(props) {
  const { open, setOpen } = props

  const [action, setAction] = useState('')

  return (
    <Dialog open={open} onClose={() => setOpen(false)} scroll="body"
     TransitionComponent={Grow}>
      <div className="m-3">

        <TextField required id="action" value={action} InputLabelProps={{ required: false }}
         onChange={(event) => setAction(event.target.value)} color="secondary" />

      </div>
    </Dialog>
  )
}
