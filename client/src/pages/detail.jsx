import React, { useEffect, useState } from 'react';
import { Grow, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Placeholder from '../components/placeholder';

const useStyles = makeStyles({
  paper: {
    padding: "3rem",
    borderRadius: "1rem"
  }
})

export default function Detail(props) {
  const { setLoading } = props;

  const classes = useStyles();
  const [show, setShow] = useState(true)

  useEffect(() => {
    setShow(false)
    setLoading(false)
  }, [setLoading])

  return (
    <div className="container">
      <div>
        {
          show ? <Placeholder />
               : <>
                  <Grow in>
                    <Paper className={classes.paper}>

                    </Paper>
                  </Grow>
                 </>
        }
      </div>
    </div>
  )
}
