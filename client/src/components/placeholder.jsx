import React from 'react';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  skeleton: {
    borderRadius: "1rem"
  },
  size: {
    padding: "19rem"
  }
})

export default function Placeholder(props) {
  const classes = useStyles();

  return (
    <Skeleton variant="rect" className={classes.skeleton} width="100%">
      <div className={classes.size}></div>
    </Skeleton>
  )
}
