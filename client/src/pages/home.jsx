import React, { useEffect, useState } from 'react';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  skeleton: {
    borderRadius: "1rem"
  }
})

export default function Home(props) {
  const { loading, setLoading } = props;

  const classes = useStyles()
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  useEffect(() => {
    let currentDate = new Date()
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

    setDate(currentDate.toLocaleDateString(undefined, options))

    setTime(currentDate.toLocaleTimeString())

    if(date && time !== '') {
      setLoading(false)
    }
  }, [date, setLoading, time])

  setInterval(() => {
    setTime(new Date().toLocaleTimeString())
  }, 1000)

  return (
    <div className="container" style={{ paddingBottom: "6rem" }}>


      <div className="d-flex align-items-center flex-column">
        {loading ? <Skeleton className={classes.skeleton} height="130px" width="50%"
                    style={{marginTop: "-2rem", marginBottom: "-0.35rem"}} />
                 : <>
                    <h2>{`Today's Date: ${date}`}</h2>
                    <h2>{time}</h2>
                   </>
                 }
      </div>

      <Skeleton variant="rect" className={classes.skeleton}>

      </Skeleton>

    </div>
  )
}
