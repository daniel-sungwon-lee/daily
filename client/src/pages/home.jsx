import React, { useEffect, useState } from 'react';
import { Avatar, Divider, Paper } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { Schedule } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import Placeholder from '../components/placeholder';

const useStyles = makeStyles({
  skeleton: {
    borderRadius: "1rem"
  },
  paper: {
    padding: "3rem",
    borderRadius: "1rem"
  },
  action: {
    color: "#4F5DFF"
  },
  avatar: {
    backgroundColor: "#788DFF"
  },
  icon: {
    fontSize: "2rem"
  }
})

export default function Home(props) {
  const { loading, setLoading } = props;

  const classes = useStyles()
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [show, setShow] = useState(true)
  const [data, setData] = useState([])

  useEffect(() => {
    let currentDate = new Date()
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

    setDate(currentDate.toLocaleDateString(undefined, options))

    setTime(currentDate.toLocaleTimeString())

    fetch('/api/routines')
      .then(res => res.json())
      .then(data => {
        setShow(false)
        setData(data)
      })
      .catch(() => window.location.reload())

    if(date && time !== '') {
      setLoading(false)
    }
  }, [date, setLoading, time])

  setInterval(() => {
    setTime(new Date().toLocaleTimeString())
  }, 1000)

  return (
    <div className="container" style={{ paddingBottom: "6rem" }}>

      <div className="d-flex align-items-center flex-column mb-4">
        {loading ? <Skeleton className={classes.skeleton} height="130px" width="50%"
                    style={{marginTop: "-2rem", marginBottom: "-0.35rem"}} />
                 : <>
                    <h2>{date}</h2>
                    <h2>{time}</h2>
                   </>
                 }
      </div>

      <div>
        {
          show ? <Placeholder />
               : <>
                  <Paper elevation={4} className={classes.paper}>
                    {
                      data.map(routine => {
                        const { id, from, to, action } = routine

                        return (
                          <>
                            <div key={id} className="my-4">
                              <div className="d-flex align-items-center">
                                <Avatar className="mr-2" classes={{ root: classes.avatar }}>
                                  <Schedule className={classes.icon} />
                                </Avatar>
                                <h5>{from}</h5>
                                <h5 className="mx-2">to</h5>
                                <h5>{to}</h5>
                              </div>

                              <h4 className={classes.action}>{action}</h4>
                            </div>

                            <Divider variant="middle" light />
                          </>
                        )
                      })
                    }
                  </Paper>
                 </>
        }
      </div>

    </div>
  )
}
