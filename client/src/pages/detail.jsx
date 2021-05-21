import React, { useEffect, useState } from 'react';
import { Checkbox, Grow, List, ListItem, ListItemIcon,
         Paper, ListItemText } from '@material-ui/core';
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
  const [data, setData] = useState([])

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
    </div>
  )
}
