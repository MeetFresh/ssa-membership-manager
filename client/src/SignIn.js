import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import axios from 'axios'
import {loginUser, getOneUser, getAllUsers} from './queries'
import { connect } from 'react-redux'
import {actionCreators} from './store'

import { ThemeProvider } from '@material-ui/core/styles';
import {theme} from './theme';

import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Society of Study of Affect
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#888888',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
}));

function handleSubmit(event, props) {
    event.preventDefault();

    const formData = new FormData(event.target)
    const LOGIN_API = '/api/login'
    loginUser(formData).then(res => {
        if (res.data.loginSuccess) {
            props.closeWrongCredentials()
            props.closeSignUpSuccess()
            const username = formData.get('username')
            props.loginAdmin(res.data.isAdmin)
            props.login(username)
            if (res.data.isAdmin) {
                getAllUsers().then(res => {
                    const users = res.data.users.map(user => ({
                        first: user.first,
                        last: user.last,
                        status: user.usertype,
                        email: user.email,
                        history: user.activityhistory
                    }))
                    props.setUserList(users)
                })
            } else {
                getOneUser(username).then(res => {
                    const { first, last, pronoun, usertype, institute, instituteId, instituteEmail, activityhistory, profilePic } = res.data.user
                    let profile = {
                        first: first || "",
                        last: last || last,
                        pronoun: pronoun || "",
                        status: usertype || "",
                        history: activityhistory || [],
                        profilePic: profilePic || ""
                    }
                    if (["undergrad", "graduate", "nt-faculty", "faculty", "postdoc"].indexOf(usertype) !== -1) {
                        if (institute) {profile.institute = institute}
                    }
                    if (["undergrad", "graduate"].indexOf(usertype) !== -1) {
                        if (instituteId) {profile.instituteId = instituteId}
                        if (instituteEmail) {profile.email = instituteEmail}
                    }
                    props.setProfile(profile)
                })
            }
            axios.get('/api/event/all').then(res => {
                let events = res.data.events.map(event => {
                    event.id = event["_id"]
                    delete event["_id"]
                    return event
                })
                props.mergeCheckoutItemList(events)
            })
            axios.get('/api/member').then(res => {
                const priceDict = {}
                res.data.member.forEach(item => {
                    priceDict[item.usertype.toLowerCase().replace("-f", "F") + "Price"] = item.pricing
                })
                props.editMembershipPrice(priceDict)
            })
        } else {
            props.openWrongCredentials()
        }
    }).catch(err => {
        props.openConnectionError()
        console.log(err)
    })
}

const mapDispatchToProps = (dispatch) => ({
    login(username) {
        dispatch(actionCreators.setUsername(username))
        dispatch(actionCreators.setLogin(true))
    },
    toSignUp() {
        dispatch(actionCreators.setCurrPage('signup'))
    },
    toRecoverAccount() {
        dispatch(actionCreators.setCurrPage('recover-account'))
    },
    loginAdmin(isLogin) {
        dispatch(actionCreators.setAdmin(isLogin))
    },
    setUserName(username) {
        dispatch(actionCreators.setUsername(username))
    },
    setProfile(profile) {
        dispatch(actionCreators.setProfile(profile))
    },
    setUserList(users) {
        dispatch(actionCreators.setUserList(users))
    },
    mergeCheckoutItemList(events) {
        dispatch(actionCreators.mergeCheckoutItemList(events))
    },
    openConnectionError() {
        dispatch(actionCreators.setConnectionError(true))
    },
    openWrongCredentials() {
        dispatch(actionCreators.setWrongCredentials(true))
    },
    closeWrongCredentials() {
        dispatch(actionCreators.setWrongCredentials(false))
    },
    closeSignUpSuccess() {
        dispatch(actionCreators.setSignUpSuccess(false))
    },
    editMembershipPrice(priceDict) {
        dispatch(actionCreators.editMembershipPrice(priceDict))
    }
})

const mapStateToProps = (state) => ({
    wrongCredentials: state.getIn(['app', 'wrongCredentials']),
})

// onSubmit={(event) => {handleSubmit(event, props.login)}}
export default connect(mapStateToProps, mapDispatchToProps)(function SignIn(props) {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <ThemeProvider theme={theme}>
                <form 
                    className={classes.form} noValidate
                    onSubmit={(event) => {handleSubmit(event, props)}}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Email Address"
                        name="username"
                        autoComplete="email"
                        autoFocus/>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"/>
                    <FormControlLabel
                        control={< Checkbox value = "remember" color = "#888888" />}
                        label="Remember me"/>
                    { props.wrongCredentials ? 
                        <Alert
                            severity="warning"
                            onClose={() => {props.closeWrongCredentials()}}
                        >
                            <AlertTitle>Wrong email/password. Try Again.</AlertTitle>
                        </Alert> : null
                    }
                    <Button
                        type="submit"
                        fullWidth
                        variant="outlined"
                        className={classes.submit}>
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2" onClick={() => {props.toRecoverAccount()}}>
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2" onClick={() => {props.toSignUp()}}>
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
                </ThemeProvider>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
})

