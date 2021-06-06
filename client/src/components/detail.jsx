import React, { useEffect, useState } from 'react';
import { Checkbox, Grow, List, ListItem, ListItemIcon, Slide,
         Paper, ListItemText, Dialog, IconButton, Fab,
         ListItemSecondaryAction } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Placeholder from '../components/placeholder';
import { AddRounded, CloseRounded } from '@material-ui/icons';
import Todo from '../components/todo';

const useStyles = makeStyles({
  paper: {
    padding: "3rem",
    borderRadius: "1rem",
    position: "relative",
    minHeight: "75vh"
  },
  emp: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    margin: "0"
  },
  closeIcon: {
    marginLeft: "0.5rem",
    marginTop: "0.5rem"
  },
  fab: {
    color: "#4F5DFF",
    backgroundColor: "#4F5DFF",
    position: "fixed",
    right: "1rem",
    bottom: "1rem",
    "&:hover": {
      backgroundColor: "#788DFF"
    }
  },
  checkbox: {
    color: "#788DFF !important"
  },
  label: {
    cursor: "pointer"
  }
})

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Detail(props) {
  const { setLoading, open, setOpen, id, action } = props;

  const classes = useStyles();
  const [show, setShow] = useState(true)
  const [data, setData] = useState([])
  const [empty, setEmpty] = useState('')
  const [todoOpen, setTodoOpen] = useState(false)

  useEffect(() => {
    if(id === null) {
      return

    } else {

      fetch(`/api/detail/${id}`)
        .then(res => res.json())
        .then(data => {

          if(data.length > 0) {
            setEmpty('d-none')
          } else {
            setEmpty('')
          }

          setData(data)
          setShow(false)
          setLoading(false)
        })
        .catch(() => window.location.reload())
    }

  }, [setLoading, id, data])

  const handleCheckbox = (todoId) => (e) => {
    const isComplete = e.target.checked
    const reqBody = { isComplete }

    fetch(`/api/detail/${todoId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reqBody)
    })
      .catch(() => window.location.reload())
  }

  const handleDelete = (todoId) => {
    fetch(`/api/detail/${todoId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    })
      .catch(() => window.location.reload())
  }

  return (
    <Dialog key={id} open={open} onClose={() => setOpen(false)} scroll="body"
     fullScreen TransitionComponent={Transition}>

      <IconButton onClick={() => setOpen(false)} className={classes.closeIcon}>
        <CloseRounded fontSize="large" color="secondary" />
      </IconButton>

      <div className="container mt-4 mb-5">
        {
          show ? <Placeholder />
               : <>
                  <Grow in>
                    <Paper className={classes.paper} elevation={5}>

                      <div className={empty} style={{ opacity: "0.5" }}>
                        <h4 className={classes.emp}>much empty...</h4>
                      </div>

                      <h2>
                        To-Do
                      </h2>

                      <List>
                        {
                          data.map(todo => {
                            const { todoId, action, isComplete } = todo

                            return (
                              <ListItem key={todoId} className="d-flex align-items-center">

                                <ListItemIcon>

                                  <Checkbox id={todoId} checked={isComplete} color="primary"
                                   onChange={handleCheckbox(todoId)} classes={{
                                     checked: classes.checkbox
                                   }} />

                                </ListItemIcon>

                                <label htmlFor={todoId} className="mb-0">
                                  <ListItemText id={todoId} primary={action}
                                   className={classes.label} />
                                </label>

                                <ListItemSecondaryAction>

                                   <IconButton onClick={() => handleDelete(todoId)}>
                                     <CloseRounded />
                                   </IconButton>

                                </ListItemSecondaryAction>

                              </ListItem>
                            )
                          })
                        }
                      </List>
                    </Paper>
                  </Grow>
                 </>
        }
      </div>

      <Fab onClick={() => setTodoOpen(true)} classes={{ root: classes.fab }}
       className={classes.fab}>
        <AddRounded fontSize="large" style={{ color: "white" }} />
      </Fab>

      <Todo open={todoOpen} setOpen={setTodoOpen} id={id} />

    </Dialog>
  )
}
