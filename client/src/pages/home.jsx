import React, { useEffect, useState } from 'react';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  skeleton: {
    borderRadius: "2rem",
    margin: "0 1rem 3rem"
  }
})

export default function Home(props) {
  const { loading, setLoading } = props;

  const classes = useStyles()
  const [date, setDate] = useState('')

  useEffect(() => {
    let currentDate = new Date()
    setDate(currentDate.toLocaleDateString())
    setLoading(false)
  }, [setLoading])

  return (
    <div className="container" style={{ paddingBottom: "6rem" }}>


      <h2>
        {loading ? <Skeleton className={classes.skeleton} /> : `Today's Date: ${date}`}
      </h2>

      <Skeleton variant="rect" className={classes.skeleton}>

      </Skeleton>

    </div>
  )
}
