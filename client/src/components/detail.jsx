import React, { useEffect, useState } from 'react';
import { Checkbox, Grow, List, ListItem, ListItemIcon, Slide,
         Paper, ListItemText, Dialog, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Placeholder from '../components/placeholder';
import { CloseRounded } from '@material-ui/icons';

const useStyles = makeStyles({
  paper: {
    padding: "3rem",
    borderRadius: "1rem"
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
  }
})

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Detail(props) {
  const { setLoading, open, setOpen, detail } = props;

  const classes = useStyles();
  const [show, setShow] = useState(true)
  const [data, setData] = useState([])
  const [empty, setEmpty] = useState('')

  useEffect(() => {
      setShow(false)
      setLoading(false)
  }, [setLoading, detail])

  return (
    <Dialog open={open} onClose={() => setOpen(false)} scroll="body"
     fullScreen TransitionComponent={Transition}>

      <IconButton onClick={() => setOpen(false)} className={classes.closeIcon}>
        <CloseRounded fontSize="large" color="secondary" />
      </IconButton>

      <div className="m-5">
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
    </Dialog>
  )
}
