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
                Society for Study of Affect
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

function handleSubmit(event, state, setState) {
    event.preventDefault()
    const form = new FormData(event.target)
    const email = form.get('username')
    axios.post('/api/auth/login/forgot', {email}).then(res => {
        state.emailSent = true
        setState({...state})
    }).catch(err => {
        state.emailSent = false
        setState({...state})
    })
}

// onSubmit={(event) => {handleSubmit(event, props.login)}}
export default connect(null, null)(function RecoverAccount(props) {
    const classes = useStyles();

    const [state, setState] = React.useState({
        emailSent: null
    })

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Recover account
                </Typography>
                <Typography variant="body2" color="textSecondary" align="left">
                    <ol>
                        <li>Provide your sign up email below and click continue.</li>
                        <li>A temporary link will be sent to that email address.</li>
                        <li>Use the link to access the page to reset your password.</li>
                    </ol>
                </Typography>

                <ThemeProvider theme={theme}>
                <form 
                    className={classes.form} noValidate
                    onSubmit={(event) => {handleSubmit(event, state, setState)}}
                >
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
                    <Button
                        disabled={state.emailSent !== true ? false : true}
                        type="submit"
                        fullWidth
                        variant="outlined"
                        className={classes.submit}>
                        Continue
                    </Button>
                    {
                        state.emailSent === true ?
                        <Alert severity="success">
                            <AlertTitle>Email sent successfully.</AlertTitle>
                        </Alert> : null
                    }
                    {
                        state.emailSent === false ?
                        <Alert severity="error">
                            <AlertTitle>Email is invalid or not signed up.</AlertTitle>
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

