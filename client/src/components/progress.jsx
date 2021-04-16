import React from 'react';
import { LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  progress: {
    backgroundColor: "white",
    height: "2.5px"
  }
})

export default function Progress(props) {
  const classes = useStyles()

  return (
    <div className="fixed-top">
      <LinearProgress classes={{ barColorPrimary: classes.progress }} />
    </div>
  )
}
