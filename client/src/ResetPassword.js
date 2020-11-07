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

function handleSubmit(event, state, setState, passToken) {
    event.preventDefault()
    const form = new FormData(event.target)
    const newPassword = form.get('newPassword')
    const confirmPassword = form.get('confirmPassword')

    if (newPassword.length < 6) {
        state.success = false
        state.errorText = 'Password is too simple.'
        setState({...state})
        return
    }
    if (newPassword !== confirmPassword) {
        state.success = false
        state.errorText = 'Passwords do not match.'
        setState({...state})
        return
    }
    
    axios.post('/api/auth/login/reset/' + passToken, {password: newPassword}).then(res => {
        state.success = true
        state.errorText = ''
        setState({...state})
    }).catch(err => {
        state.success = false
        state.errorText = 'Reset password failed. Retry.'
        setState({...state})
    })
}

const mapStateToProps = (state) => ({
    passToken: state.getIn(['app', 'tempResetPassToken'])
})

// onSubmit={(event) => {handleSubmit(event, props.login)}}
export default connect(mapStateToProps, null)(function ResetPassword(props) {
    const classes = useStyles();

    const [state, setState] = React.useState({
        success: null,
        errorText: ""
    })

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Reset password
                </Typography>
                <ThemeProvider theme={theme}>
                <form 
                    className={classes.form} noValidate
                    onSubmit={(event) => {handleSubmit(event, state, setState, props.passToken)}}
                >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="newPassword"
                        label="New Password"
                        name="newPassword"
                        type="password"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="confirmPassword"
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                    />
                    <Button
                        disabled={state.success !== true ? false : true}
                        type="submit"
                        fullWidth
                        variant="outlined"
                        className={classes.submit}>
                        Confirm
                    </Button>
                    {
                        state.success === true ?
                        <Alert severity="success">
                            <AlertTitle>Your password has been reset.</AlertTitle>
                            <Link href="/">Click here to log in.</Link>
                        </Alert> : null
                    }
                    {
                        state.success === false ?
                        <Alert severity="error">
                            <AlertTitle>{state.errorText}</AlertTitle>
                        </Alert> : null
                    }
                </form>
                </ThemeProvider>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
})

