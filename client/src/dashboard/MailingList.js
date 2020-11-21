import React from 'react';
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
                                <option value={'scholar'}>Independent Scholar / Other</option>
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
                        showCheckbox={true}
                      />
                    </Grid>
                    <Grid container alignItems="center" justify="center">
                      <Button
                        variant="outlined"
                        style={{
                            marginTop: 10,
                            marginRight: 10,
                        }}
                        onClick={() => {filteredList().forEach((row) => {state.checks[row.email] = false}); setState({...state}) }}
                      >Clear Select</Button>
                      <Button
                        variant="outlined"
                        style={{
                            marginTop: 10,
                            marginRight: 10,
                        }}
                        onClick={() => {filteredList().forEach((row) => {state.checks[row.email] = true}); setState({...state}) }}
                      >Select All</Button>
                    </Grid>
                </Grid>

                <Grid item container direction="column" xs={12} sm={6}>
                    <Typography variant="h5" gutterBottom className={classes.title}>
                        Mailing List
                    </Typography>
                    <Grid style={{marginTop: 20, marginBottom: 20}}container alignItems="center" justify="center">
                      <DisplayList
                        checkList={checkList}
                      />
                    </Grid>
                    <Grid container alignItems="center" justify="center">
                      <Button
                          variant="outlined"
                          style={{
                              marginTop: 10,
                              marginRight: 10,
                          }}
                          onClick={() => {copyToClipboard(sendEmailString)}}
                          disabled={ sendEmailString.length === 0}
                      >Copy Address</Button>
                      <a
                        style={{textDecoration: "none"}}
                        disabled={ sendEmailString.length === 0}
                        href={"mailto:" + sendEmailString}
                      >
                        <Button
                            disabled={ sendEmailString.length === 0}
                            variant="outlined"
                            style={{
                                marginTop: 10,
                                marginRight: 10,
                            }}
                        >Send Email</Button>
                      </a>
                    </Grid>
                </Grid>
                
            </Grid>

            </main>
        </React.Fragment>
    );
})