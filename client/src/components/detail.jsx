import React, { useEffect, useState } from 'react';
import { Checkbox, Grow, List, ListItem, ListItemIcon, Slide,
         Paper, ListItemText, Dialog, IconButton, Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Placeholder from '../components/placeholder';
import { AddRounded, CloseRounded } from '@material-ui/icons';
import Todo from '../components/todo';

const useStyles = makeStyles({
  paper: {
    padding: "3rem",
    borderRadius: "1rem",
    position: "relative"
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
  }
})

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Detail(props) {
  const { setLoading, open, setOpen, id } = props;

  const classes = useStyles();
  const [show, setShow] = useState(true)
  const [data, setData] = useState([])
  const [empty, setEmpty] = useState('')
  const [todoOpen, setTodoOpen] = useState(false)

  useEffect(() => {
      setShow(false)
      setLoading(false)
  }, [setLoading, id])

  return (
    <Dialog open={open} onClose={() => setOpen(false)} scroll="body"
     fullScreen TransitionComponent={Transition}>

      <IconButton onClick={() => setOpen(false)} className={classes.closeIcon}>
        <CloseRounded fontSize="large" color="secondary" />
      </IconButton>

      <div className="my-4 mx-5">
        {
          show ? <Placeholder />
               : <>
                  <Grow in>
                    <Paper className={classes.paper} elevation={5}>

                      <div className={empty} style={{ opacity: "0.5" }}>
                        <h4 className={classes.emp}>much empty...</h4>
                      </div>

                      <List>
                        {
                          data.map(todo => {
                            const { todoId, action, isComplete } = todo

                            return (
                              <ListItem>
                                <ListItemIcon>
                                  <Checkbox checked={isComplete} color="primary" />
                                </ListItemIcon>
                                <ListItemText id={todoId} primary={action} />
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
