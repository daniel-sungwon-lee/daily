import React, { useEffect, useState } from 'react';
import { Avatar, Divider, Grow, IconButton, Menu, MenuItem, Paper,
         Fab } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { MoreVertRounded, Schedule, KeyboardArrowUpRounded, CloseRounded } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Placeholder from '../components/placeholder';
import Edit from '../components/edit';
import Delete from '../components/delete';
import Detail from '../components/detail';
import ScrollTop from '../components/top';
import { useSnackbar } from 'notistack';
import playSound from '../sound';

const useStyles = makeStyles({
  skeleton: {
    borderRadius: "1rem"
  },
  paper: {
    padding: "3rem",
    borderRadius: "1rem"
  },
  action: {
    color: "#4F5DFF",
    margin: "0.5rem 0",
    width: "50%",
    wordWrap: "break-word",
    wordBreak: "break-word",
    "&:hover": {
      cursor: "pointer"
    }
  },
  avatar: {
    backgroundColor: "#788DFF",
    marginRight: "0.75rem"
  },
  icon: {
    fontSize: "2rem"
  },
  menu: {
    borderRadius: "1rem"
  },
  closeIcon: {
    color: "white"
  }
})

export default function Home(props) {
  const { loading, setLoading } = props;
  const { userId } = props.user;

  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [show, setShow] = useState(true)
  const [data, setData] = useState([])
  const [open, setOpen] = useState(false)
  const [editId, setEditId] = useState(null)
  const [empty, setEmpty] = useState('')
  const [del, setDel] = useState(false)
  const [delId, setDelId] = useState(null)
  const [openDetail, setOpenDetail] = useState(false)
  const [detail, setDetail] = useState(null)

  const classes = useStyles()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  useEffect(() => {
    let currentDate = new Date()
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

    setDate(currentDate.toLocaleDateString(undefined, options))

    setTime(currentDate.toLocaleTimeString())

    fetch(`/api/routines/${userId}`)
      .then(res => res.json())
      .then(data => {
        if(data.length > 0) {
          setEmpty('d-none')
        }

        setShow(false)
        setData(data)
      })
      .catch(() => window.location.reload())

    if(date && time !== '') {
      setLoading(false)
    }
  }, [date, setLoading, time, userId])

  setInterval(() => {
    setTime(new Date().toLocaleTimeString())
  }, 1000)

  const handleEdit = (popupState, id) => {
    popupState.close()
    setOpen(true)
    setEditId(id)
  }

  const handleDelete = (popupState, id) => {
    popupState.close()
    setDel(true)
    setDelId(id)
  }

  const handleDetail = (popupState, id) => {
    popupState.close()
    setOpenDetail(true)
    setDetail(id)
  }

  const handleDetail2 = (id) => {
    setOpenDetail(true)
    setDetail(id)
  }

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
                  <Grow in>
                  <Paper elevation={4} className={classes.paper}>

                    <div className={empty} style={{ opacity: "0.5" }}>
                      <h4>much empty...</h4>
                    </div>

                    {
                      data.map(routine => {
                        const { id, from, to, action } = routine

                        let opacity = "opacity"

                        const fromDate = new Date(`March 03 2033 ${from}`)
                        const toDate = new Date(`March 03 2033 ${to}`)

                        const fromTime = fromDate.toLocaleTimeString([], { timeStyle: "short" })
                        const toTime = toDate.toLocaleTimeString([], { timeStyle: "short" })

                        const time = new Date().toLocaleTimeString()
                        const fromTimeSec = fromDate.toLocaleTimeString()
                        const toTimeSec = toDate.toLocaleTimeString()

                        if (fromTimeSec < time && time < toTimeSec) {
                          opacity="show"
                        }

                        if (time === fromTimeSec) {
                          for(let i =0; i<1; i++) {
                            playSound('/sounds/intuition.mp3')
                          }

                          enqueueSnackbar(action, { persist: true, action: (

                              <IconButton onClick={() => closeSnackbar()}
                               className={classes.closeIcon}>
                                 <CloseRounded />
                              </IconButton>

                          ) })
                        }

                        return (
                          <div key={id}>
                            <div className={opacity}>
                              <div className="mt-4 mb-5">

                                <div className="d-flex justify-content-between">

                                  <div className="d-flex mt-2">
                                    <Avatar classes={{ root: classes.avatar }}>
                                      <Schedule className={classes.icon} />
                                    </Avatar>

                                    <h5>{fromTime}</h5>
                                    <h5 className="mx-2">to</h5>
                                    <h5>{toTime}</h5>
                                  </div>

                                  <div>
                                    <PopupState id="menu" variant="popover">
                                      {
                                        popupState => (
                                          <>
                                            <IconButton {...bindTrigger(popupState)}>
                                              <MoreVertRounded />
                                            </IconButton>

                                            <Menu {...bindMenu(popupState)} classes={{
                                              paper: classes.menu }}
                                              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                              getContentAnchorEl={null}
                                              >

                                              <MenuItem onClick={() => handleEdit(popupState, id)}>
                                                <div className="p-2" style={{ color: "#4F5DFF" }}>
                                                  edit
                                                </div>
                                              </MenuItem>

                                              <MenuItem onClick={() => handleDelete(popupState, id)}>
                                                <div className="p-2" style={{ color: "#f50057" }}>
                                                  delete
                                                </div>
                                              </MenuItem>

                                              <MenuItem onClick={() => handleDetail(popupState, id)}>
                                                <div className="p-2" style={{ color: "#4F5DFF" }}>
                                                  detail
                                                </div>
                                              </MenuItem>

                                            </Menu>
                                          </>
                                        )
                                      }
                                    </PopupState>
                                  </div>

                                </div>

                                <div className="d-flex justify-content-center mt-4">
                                  <h4 className={classes.action} onClick={() => handleDetail2(id)}>
                                    {action}
                                  </h4>
                                </div>

                              </div>

                            </div>

                            <>
                             {
                               data.indexOf(routine) === data.length -1 ? <></>
                                                                        : <Divider variant="middle" light />
                             }
                            </>

                          </div>
                        )
                      })
                    }
                  </Paper>
                  </Grow>

                  <Edit open={open} setOpen={setOpen} id={editId} userId={userId} />

                  <Delete open={del} setOpen={setDel} id={delId} userId={userId} />

                  <Detail open={openDetail} setOpen={setOpenDetail} id={detail}
                   setLoading={setLoading} />

                 </>
        }
      </div>

      <ScrollTop {...props}>
        <a href="#top">
          <Fab color="secondary" size="large">
            <KeyboardArrowUpRounded className={classes.icon} />
          </Fab>
        </a>
      </ScrollTop>

    </div>
  )
}
