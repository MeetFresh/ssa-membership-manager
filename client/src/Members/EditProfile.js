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
    saveProfile(state) {
        //do something to save the input

        const { first, last, pronoun, status } = state
        const profile = {
            first, last, pronoun, status
        }
        if (status === 'faculty' || status === 'student') {
            profile.institute = state.institute
        }
        if (status === 'student') {
            profile.instituteId = state.instituteId
            profile.email = state.email
        }
        dispatch(actionCreators.setProfile(profile))
        dispatch(actionCreators.setCurrPage("profile"))
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
        email: profile.email || '',
        emailValidation: true
    });

    const handleChange = (event) => {
        const name = event.target.name;
        state[[name]] = event.target.value
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
        && validateInput(null, 'status', state.status)
        if (!basic) {
            return false
        }
        if (state.status === 'student') {
            return validateInput(null, 'institute', state.institute)
            && validateInput(null, 'instituteId', state.instituteId)
            && validateInput(null, 'email', state.email)
        }
        if (state.status === 'faculty') {
            return validateInput(null, 'institute', state.institute)
        }
        return true
    }

    const applyRule = (name, value) => {
        switch (name) {
            case 'email':
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

                <form noValidate autoComplete="off" className={classes.btn}>
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
                                    onChange={(event) => {handleChange(event); validateInput(event)}}
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
                                    <option value={'student'}>Student</option>
                                    <option value={'faculty'}>Faculty</option>
                                    <option value={'other'}>Other</option>
                                </Select>
                                {state.statusValidation !== true ? <FormHelperText error>{state.statusValidation}</FormHelperText> : null}
                            </Grid>
                        </Grid>
                        {
                            ['student', 'faculty'].indexOf(state.status) !== -1 ?
                            <Grid container spacing={1}  className={classes.grid}>
                                {
                                    state.status === 'student' ?
                                    <FormHelperText>To verify your student status, enter the institute you attend, institute ID and email.</FormHelperText>
                                    : state.status === 'faculty' ?
                                    <FormHelperText>To verify your faculty status, enter the institute you work at.</FormHelperText>
                                    : null
                                }
                                <Grid item sm={6}>
                                    <Typography variant="subtitle1" gutterBottom className={classes.col} align="left">
                                        Insitute*
                                    </Typography>
                                </Grid>
                                <Grid item sm={6}>
                                    <TextField
                                        id="standard-basic"
                                        label="Intsitute"
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
                            state.status === 'student' ?
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
                                            label="Intsitute ID"
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
                                            label="Email" 
                                            fullWidth="true"
                                            value={state.email}
                                            onChange={(event) => {handleChange(event); validateInput(event)}}
                                            inputProps={{
                                                name: 'email',
                                            }}
                                            error={state.emailValidation === true ? false : true}
                                            helperText={state.emailValidation}
                                        />
                                    </Grid>
                                </Grid>
                            </Fragment> : null
                        }
                    </Grid>
                </form>


                <Button className={classes.btn}
                        variant="outlined"
                        style={{
                            marginTop: 10,
                        }}
                        onClick={() => {props.goProfile()}}
                >Back</Button>

                <Button className={classes.btn}
                    variant="outlined"
                    style={{
                        marginTop: 10,
                    }}
                    onClick={() => {
                        if (validateAll()) {
                            props.saveProfile(state)
                        }
                    }}
                >Save</Button>
                </ThemeProvider>
            </main>
        </React.Fragment>
    );
});