import React, {Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import {actionCreators} from "../store";
import {connect} from "react-redux";
import FilterList from './FilterList'
import DisplayList from './DisplayList';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import {adminUpdateUserProfile} from '../queries'

const useStyles = makeStyles((theme) => ({
    listItem: {
        padding: theme.spacing(1, 0),
    },
    total: {
        fontWeight: 700,
    },
    title: {
        marginTop: theme.spacing(2),
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 900,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    pic: {
        marginTop: theme.spacing(2),
        width: 130,
        height: 130,
        borderRadius: '50%',
        borderStyle: 'solid',
    }
}));

const mapDispatchToProps = (dispatch) => ({
  changeUserStatus(username, newStatus) {
      dispatch(actionCreators.changeUserStatus(username, newStatus))
  },
  openConnectionError() {
    dispatch(actionCreators.setConnectionError(true))
  }
})

const mapStateToProps = (state) => ({
  userList: state.getIn(['app', 'userList'])
})

export default connect(mapStateToProps, mapDispatchToProps)(function Membership(props) {

    const classes = useStyles();

    const [state, setState] = React.useState({
        status: 'none',
        name: '',
        email: '',
        clicked: '',
        checks: props.userList.toJS().map((user) => (user.email)).reduce((a,b)=> (a[b]=false,a),{})
    })

    const handleChange = (event) => {
      const name = event.target.name;
      state[[name]] = event.target.value
      setState({...state})
    };

    const changeStatus = (event, email) => {
        const formData = new FormData()
        formData.append("email", email)
        formData.append("usertype", event.target.value)
        const event_target_value = event.target.value
        adminUpdateUserProfile(formData).then((res) => {
          props.changeUserStatus(email, event_target_value)
        }).catch(err => {
          props.openConnectionError()
        })
    };

    function filteredList() {
      return props.userList.toJS().filter(
        (row) => (row.email.toLowerCase().indexOf(state.email.toLowerCase()) != -1)
      ).filter(
        (row) => ((row.first + " " + row.last).toLowerCase().indexOf(state.name.toLowerCase()) != -1)
      ).filter(
        (row) => {
          const filterStatus = state.status
          switch (filterStatus) {
            case 'none':
              return true
            case 'graduate':
              return row.status === 'graduate'
            case 'undergrad':
              return row.status === 'undergrad'
            case 'nt-faculty':
              return row.status === 'nt-faculty'
            case 'faculty':
              return row.status === 'faculty'
            case 'postdoc':
              return row.status === 'postdoc'
            case 'scholar':
              return row.status === 'scholar'
            case 'member':
              return ['graduate', 'undergrad', 'nt-faculty', 'faculty', 'postdoc', 'scholar'].indexOf(row.status) != -1
            case 'non-member':
              return row.status === 'non-member'
          }
          return false
        }
      )
    }

    function copyToClipboard(value) {
      const tempInput = document.createElement("input");
      tempInput.value = value;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
    }

    const checkList = props.userList.toJS().filter((row) => (state.checks[row.email] === true))
    const sendEmailString = checkList.map((row) => (row.email)).join(';')
    const isClicked = props.userList.toJS().find(e => e.email === state.clicked);

    let history = props.userList.toJS().filter(user => (user.email === state.clicked))
    history = history.length === 1 ? history[0].history.filter(hist => hist !== "").map(hist => {
      const status_register = hist.split(",")
      return {
        status: status_register[0],
        register: (new Date(status_register[1])).toDateString(),
        expire: (new Date(status_register[2])).toDateString()
      }
    }) : []

    return (
        <React.Fragment>
            <main className={classes.layout}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h5" gutterBottom className={classes.title}>
                        Filters
                    </Typography>
                    <List disablePadding>
                        <ListItem className={classes.listItem}>
                            <ListItemText primary="Membership" />
                            <Typography variant="body2">
                              <Select className={classes.col}
                                native
                                fullWidth="true"
                                value={state.status}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'status',
                                }}
                              >
                                <option aria-label="None" value="none">All</option>
                                <option value={'graduate'}>Graduate</option>
                                <option value={'undergrad'}>Undergrad</option>
                                <option value={'nt-faculty'}>NT-Faculty</option>
                                <option value={'faculty'}>Faculty</option>
                                <option value={'postdoc'}>Postdoc</option>
                                <option value={'scholar'}>Scholar</option>
                                <option value={'member'}>Member</option>
                                <option value={'non-member'}>Non-Member</option>
                              </Select>
                            </Typography>
                        </ListItem>
                        <ListItem className={classes.listItem}>
                            <ListItemText primary="Name" />
                            <Typography variant="body2">
                              <TextField
                                      id="name"
                                      fullWidth="true"
                                      value={state.last}
                                      onChange={handleChange}
                                      inputProps={{
                                          name: 'name'
                                      }}
                              />
                            </Typography>
                        </ListItem>
                        <ListItem className={classes.listItem}>
                            <ListItemText primary="Email" />
                            <Typography variant="body2">
                              <TextField
                                      id="email"
                                      fullWidth="true"
                                      value={state.last}
                                      onChange={handleChange}
                                      inputProps={{
                                          name: 'email'
                                      }}
                              />
                            </Typography>
                        </ListItem>
                    </List>

                    <Grid style={{marginTop: 20, marginBottom: 20}} container alignItems="center" justify="center">
                      <FilterList
                        filteredList={filteredList()}
                        checks={state.checks}
                        toggleCheck={(email) => {state.checks[email] = !state.checks[email]; setState({...state})}}
                        mouseEnter={(email) => {state.clicked = email; setState({...state})}}
                        showCheckbox={false}
                      />
                    </Grid>
                </Grid>

                <Grid item container direction="column" xs={12} sm={6}>
                    <Typography variant="h5" gutterBottom className={classes.title}>
                        Member Info
                    </Typography>
                    <Grid container alignItems="center" justify="center">

                        {   state.clicked === '' ?
                            <Typography variant="body">
                                Click from the list on the left to show member's information.
                            </Typography>
                            :
                            <Fragment>
                                <List disablePadding>

                                <ListItem className={classes.listItem}>
                                <ListItemText primary='Name' />
                                <Typography variant="body2" style={{marginLeft: 40}}>{isClicked.first + ' ' + isClicked.last}</Typography>
                                </ListItem>
                                <ListItem className={classes.listItem}>
                                <ListItemText primary='Membership Status' />
                                    <Typography variant="body2" style={{marginLeft: 40}}>
                                        <Select className={classes.col}
                                                native
                                                fullWidth="true"
                                                value={isClicked.status}
                                                onChange={(event) => {changeStatus(event, state.clicked)}}
                                                inputProps={{
                                                    name: 'status',
                                                }}
                                        >
                                            <option value={'graduate'}>Graduate</option>
                                            <option value={'undergrad'}>Undergrad</option>
                                            <option value={'nt-faculty'}>NT-Faculty</option>
                                            <option value={'faculty'}>Faculty</option>
                                            <option value={'postdoc'}>Postdoc</option>
                                            <option value={'scholar'}>Scholar</option>
                                            <option value={'non-member'}>Non-Member</option>
                                        </Select>
                                    </Typography>
                                </ListItem>
                                <ListItem className={classes.listItem}>
                                <ListItemText primary='Email' />
                                <Typography variant="body2" style={{marginLeft: 40}}>{isClicked.email}</Typography>
                                </ListItem>

                                </List>
                                <Typography variant="h6" gutterBottom className={classes.title}>
                                    Membership History
                                </Typography>
                                <Grid style={{marginTop: 20, marginBottom: 20}} container alignItems="center" justify="center">
                                    <TableContainer style={{ maxHeight: 246 }}>
                                        <Table stickyHeader size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Status</TableCell>
                                                <TableCell>Registration</TableCell>
                                                <TableCell>Expiration</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                              history.map(hist => (
                                                <TableRow>
                                                  <TableCell>{hist.status}</TableCell>
                                                  <TableCell>{hist.register}</TableCell>
                                                  <TableCell>{hist.expire}</TableCell>
                                                </TableRow>
                                              ))
                                            }
                                        </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            </Fragment>
                        }
                    </Grid>
                </Grid>
            </Grid>

            </main>
        </React.Fragment>
    );
})