import React, { useEffect, useState } from 'react';
import { Checkbox, Grow, List, ListItem, ListItemIcon,
         Paper, ListItemText, Dialog } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Placeholder from '../components/placeholder';

const useStyles = makeStyles({
  dialog: {
    width: "75%",
    borderRadius: "1rem"
  },
  paper: {
    padding: "3rem",
    borderRadius: "1rem"
  }
})

export default function Detail(props) {
  const { setLoading, open, setOpen, detail, userId } = props;

  const classes = useStyles();
  const [show, setShow] = useState(true)
  const [data, setData] = useState([])

  useEffect(() => {
    setShow(false)
    setLoading(false)
  }, [setLoading])

  return (
    <Dialog open={open} onClose={() => setOpen(false)} scroll="body" TransitionComponent={Grow}
     classes={{ paper: classes.dialog }}>
      <div className="m-5">
        {
          show ? <Placeholder />
               : <>
                  <Grow in>
                    <Paper className={classes.paper}>
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
