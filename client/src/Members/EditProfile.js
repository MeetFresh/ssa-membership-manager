import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Paper from "../Payment/Checkout";
import Divider from "../dashboard";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import {actionCreators} from "../store";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import validator from 'email-validator'
import {profile} from "./profileList";
import { ThemeProvider } from '@material-ui/core/styles';
import {theme} from '../theme';
import axios from 'axios'

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
        [theme.breakpoints.up(500 + theme.spacing(2) * 2)]: {
            width: 500,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    grid: {
        marginTop: theme.spacing(1),
    },
    btn: {
        margin: theme.spacing(2),
    },
    col: {
        paddingTop: 15,
        paddingBottom: 0,
    }
}));

const mapDispatchToProps = (dispatch) => ({
    saveProfile(state, event) {
        //do something to save the input

        const { first, last, pronoun, status } = state
        const profile = {
            first, last, pronoun, status, 
        }
        if (['graduate', 'undergrad', 'nt-faculty', 'faculty', 'postdoc'].indexOf(status) !== -1) {
            profile.institute = state.institute
        }
        if (['graduate', 'undergrad'].indexOf(status) !== -1) {
            profile.instituteId = state.instituteId
            profile.email = state.instituteEmail
        }
        
        const formData = new FormData(event.target)
        const UPDATE_PROFILE_API = '/api/user'
        axios.put(
            UPDATE_PROFILE_API, formData,
            {'Content-Type': 'multipart/form-data'}
        ).then(res => {
            dispatch(actionCreators.setProfile(profile))
            dispatch(actionCreators.setCurrPage("profile"))
        }).catch(err => {
            console.log(err)
            dispatch(actionCreators.setConnectionError(true))
        })
    },
    goProfile() {
        dispatch(actionCreators.setCurrPage("profile"))
    },
})

const mapStateToProps = (state) => ({
    profile: state.getIn(['app', 'profile'])
})

export default connect(mapStateToProps, mapDispatchToProps)(function EditProfile(props) {
    const classes = useStyles();
    const profile = props.profile.toJS()
    const [state, setState] = React.useState({
        pronoun: profile.pronoun || '',
        status: profile.status || '',
        statusValidation: true,
        first: profile.first || '',
        firstValidation: true,
        last: profile.last || '',
        lastValidation: true,
        institute: profile.institute || '',
        instituteValidation: true,
        instituteId: profile.instituteId || '',
        instituteIdValidation: true,
        instituteEmail: profile.email || '',
        instituteEmailValidation: true,
        newPassword: "",
        newPasswordValidation: true,
        confirmPassword: "",
        confirmPasswordValidation: true
    });

    const handleChange = (event) => {
        console.log(event.target.name, event.target.value)
        const name = event.target.name;
        state[[name]] = event.target.value
        if (name === 'newPassword' && state[[name]] === '') {
            state["confirmPassword"] = ""
            state["confirmPasswordValidation"] = true
        }
        setState({...state})
    };

    const validateInput = (event, name=null, value=null) => {
        if (event) {
            name = event.target.name
            value = event.target.value
        }
        const setValue = applyRule(name, value)
        state[[name + 'Validation']] = setValue
        setState({...state})
        return setValue === true ? true : false
    }

    const validateAll = () => {
        const basic = validateInput(null, 'first', state.first) && validateInput(null, 'last', state.last)
        && validateInput(null, 'status', state.status) && validateInput(null, 'newPassword', state.newPassword)
        && validateInput(null, 'confirmPassword', state.confirmPassword)
        if (!basic) {
            return false
        }
        if (['graduate', 'undergrad'].indexOf(state.status) !== -1) {
            return validateInput(null, 'institute', state.institute)
            && validateInput(null, 'instituteId', state.instituteId)
            && validateInput(null, 'instituteEmail', state.instituteEmail)
        }
        if (['nt-faculty', 'faculty', 'postdoc'].indexOf(state.status) !== -1) {
            return validateInput(null, 'institute', state.institute)
        }
        return true
    }

    const applyRule = (name, value) => {
        switch (name) {
            case 'instituteEmail':
                return validator.validate(value) && value.substring(value.indexOf('.')) === '.edu' ? true :
                (value === '' ? 'Email is required.' : 'Institute (.edu) email required.')
            case 'status':
                return value !== '' ? true : 'Must pick one.'
            case 'institute':
                return value !== '' ? true : 'Institute is required.'
            case 'instituteId':
                return value !== '' ? true : 'Institute ID is required.'
            case 'first':
                return value !== '' ? true : 'First name is required.'
            case 'last':
                return value !== '' ? true : 'Last name is required.'
            case 'newPassword':
                return value.length == 0 || value.length >= 6 ? true : 'New password is too simple.'
            case 'confirmPassword':
                return value === state.newPassword ? true : 'Passwords do not match.'
            default:
                return true
        }
    }

    return (
        <React.Fragment>
            <main className={classes.layout}>
                <ThemeProvider theme={theme}>
                <Typography variant="h5" gutterBottom className={classes.title}>
                    Edit My Profile
                </Typography>

                <form
                    noValidate autoComplete="off"
                    className={classes.btn}
                    onSubmit={(event) => {
                        event.preventDefault()
                        if (validateAll()) {
                            props.saveProfile(state, event)
                        }
                    }}
                >
                    <input type="hidden" id="username-input" name="username" value={props.profile.toJS().username} />
                    <Grid container spacing={2}>
                        <Grid container spacing={1} className={classes.grid}>
                            <Grid item sm={6}>
                                <Typography variant="subtitle1" gutterBottom className={classes.col} align="left">
                                    First Name*
                                </Typography>
                            </Grid>
                            <Grid item sm={6}>
                                <TextField
                                    id="standard-basic"
                                    label="First Name"
                                    fullWidth="true"
                                    value={state.first}
                                    onChange={(event) => { handleChange(event); validateInput(event)}}
                                    inputProps={{
                                        name: 'first'
                                    }}
                                    error={state.firstValidation === true ? false : true}
                                    helperText={state.firstValidation}
                                    standard-basic  />
                            </Grid>
                        </Grid>
                        <Grid container spacing={1}  className={classes.grid}>
                            <Grid item sm={6}>
                                <Typography variant="subtitle1" gutterBottom className={classes.col} align="left">
                                    Last Name*
                                </Typography>
                            </Grid>
                            <Grid item sm={6}>
                                <TextField
                                    id=""
                                    label="Last Name"
                                    fullWidth="true"
                                    value={state.last}
                                    onChange={(event) => {handleChange(event); validateInput(event)}}
                                    inputProps={{
                                        name: 'last'
                                    }}
                                    error={state.lastValidation === true ? false : true}
                                    helperText={state.lastValidation}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={1}  className={classes.grid}>
                            <Grid item sm={6}>
                                <Typography variant="subtitle1" gutterBottom className={classes.col} align="left">
                                    New Password (Optional)
                                </Typography>
                            </Grid>
                            <Grid item sm={6}>
                                <TextField
                                    id=""
                                    type="password"
                                    label="New Password"
                                    fullWidth="true"
                                    value={state.newPassword}
                                    onChange={(event) => {handleChange(event); validateInput(event)}}
                                    inputProps={{
                                        name: 'newPassword'
                                    }}
                                    error={state.newPasswordValidation === true ? false : true}
                                    helperText={state.newPasswordValidation}
                                />
                            </Grid>
                        </Grid>
                        {
                            state.newPassword !== "" ?
                            <Grid container spacing={1}  className={classes.grid}>
                                <Grid item sm={6}>
                                    <Typography variant="subtitle1" gutterBottom className={classes.col} align="left">
                                        Confirm Password*
                                    </Typography>
                                </Grid>
                                <Grid item sm={6}>
                                    <TextField
                                        id=""
                                        type="password"
                                        label="Confirm Password"
                                        fullWidth="true"
                                        value={state.confirmPassword}
                                        onChange={(event) => {handleChange(event); state["confirmPasswordValidation"] = true; setState({...state})}}
                                        inputProps={{
                                            name: 'confirmPassword'
                                        }}
                                        error={state.confirmPasswordValidation === true ? false : true}
                                        helperText={state.confirmPasswordValidation}
                                    />
                                </Grid>
                            </Grid> : null
                        }
                        <Grid container spacing={1}  className={classes.grid}>
                            <Grid item sm={6}>
                                <Typography variant="subtitle1" gutterBottom className={classes.col} align="left">
                                    Pronoun
                                </Typography>
                            </Grid>
                            <Grid item sm={6}>
                                <Select className={classes.col}
                                        native
                                        fullWidth="true"
                                        value={state.pronoun}
                                        onChange={handleChange}
                                        inputProps={{
                                            name: 'pronoun',
                                        }}
                                >
                                    <option aria-label="None" value="" />
                                    <option value={'he'}>He</option>
                                    <option value={'she'}>She</option>
                                    <option value={'they'}>They</option>
                                </Select>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1}  className={classes.grid}>
                            <Grid item sm={6}>
                                <Typography variant="subtitle1" gutterBottom className={classes.col} align="left">
                                    Status*
                                </Typography>
                            </Grid>
                            <Grid item sm={6}>
                                
                                <Select className={classes.col}
                                    native
                                    fullWidth="true"
                                    value={state.status}
                                    onChange={(event) => {handleChange(event); validateInput(event)}}
                                    inputProps={{
                                        name: 'status',
                                    }}
                                    error={state.statusValidation === true ? false : true}
                                >
                                    <option aria-label="None" value="" />
                                    <option value={'graduate'}>Graduate</option>
                                    <option value={'undergrad'}>Undergrad</option>
                                    <option value={'nt-faculty'}>NT-Faculty</option>
                                    <option value={'faculty'}>Faculty</option>
                                    <option value={'postdoc'}>Postdoc</option>
                                    <option value={'scholar'}>Scholar</option>
                                </Select>
                                {state.statusValidation !== true ? <FormHelperText error>{state.statusValidation}</FormHelperText> : null}
                            </Grid>
                        </Grid>
                        {
                            ['graduate', 'undergrad', 'nt-faculty', 'faculty', 'postdoc'].indexOf(state.status) !== -1 ?
                            <Grid container spacing={1}  className={classes.grid}>
                                {
                                    ['graduate', 'undergrad'].indexOf(state.status) !== -1 ?
                                    <FormHelperText style={{width: "100%"}}>Enter the institute you attend, institute ID and email.</FormHelperText>
                                    : ['nt-faculty', 'faculty', 'postdoc'].indexOf(state.status) !== -1 ?
                                    <FormHelperText style={{width: "100%"}}>Enter the institute you work at.</FormHelperText>
                                    : null
                                }
                                <Grid item sm={6}>
                                    <Typography variant="subtitle1" gutterBottom className={classes.col} align="left">
                                        Institute*
                                    </Typography>
                                </Grid>
                                <Grid item sm={6}>
                                    <TextField
                                        id="standard-basic"
                                        label="Institute"
                                        fullWidth="true"
                                        value={state.institute}
                                        onChange={(event) => {handleChange(event); validateInput(event)}}
                                        inputProps={{
                                            name: 'institute',
                                        }}
                                        error={state.instituteValidation === true ? false : true}
                                        helperText={state.instituteValidation}
                                    />
                                </Grid>
                            </Grid> : null
                        }
                        {
                            ['graduate', 'undergrad'].indexOf(state.status) !== -1 ?
                            <Fragment>
                                <Grid container spacing={1}  className={classes.grid}>
                                    <Grid item sm={6}>
                                        <Typography variant="subtitle1" gutterBottom className={classes.col} align="left">
                                            Insitute ID*
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={6}>
                                        <TextField
                                            id="standard-basic"
                                            label="Institute ID"
                                            fullWidth="true"
                                            value={state.instituteId}
                                            onChange={(event) => {handleChange(event); validateInput(event)}}
                                            inputProps={{
                                                name: 'instituteId',
                                            }}
                                            error={state.instituteIdValidation === true ? false : true}
                                            helperText={state.instituteIdValidation}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={1}  className={classes.grid}>
                                    <Grid item sm={6}>
                                        <Typography variant="subtitle1" gutterBottom className={classes.col} align="left">
                                            Institute Email*
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={6}>
                                        <TextField 
                                            id="standard-basic" 
                                            label="Institute Email" 
                                            fullWidth="true"
                                            value={state.instituteEmail}
                                            onChange={(event) => {handleChange(event); validateInput(event)}}
                                            inputProps={{
                                                name: 'instituteEmail',
                                            }}
                                            error={state.instituteEmailValidation === true ? false : true}
                                            helperText={state.emailValidation}
                                        />
                                    </Grid>
                                </Grid>
                            </Fragment> : null
                        }
                    </Grid>
                    <Button className={classes.btn}
                        variant="outlined"
                        style={{
                            marginTop: 30,
                        }}
                        onClick={() => {props.goProfile()}}
                    >Back</Button>

                    <Button className={classes.btn}
                        variant="outlined"
                        style={{
                            marginTop: 30,
                        }}
                        type="submit"
                    >Save</Button>
                </form>
                </ThemeProvider>
            </main>
        </React.Fragment>
    );
});
