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
import { connect } from 'react-redux'
import {actionCreators} from './store'

import { ThemeProvider } from '@material-ui/core/styles';
import {theme} from './theme';

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

function handleSubmit(event, login, loginAdmin) {
    event.preventDefault();
    const formData = new FormData(event.target);
    // !!! axios.post('/mockAPI/login.json', formData)
    axios.get('/mockAPI/login.json').then(res => {
        if (res.data['login-success']) {
            login()
        } else {
            window.alert('login error')
        }
    })

    // need to change hardcoded admin
    const email = formData.get('email')
    const password = formData.get('password')
    if (email === 'wtruran@gatech.edu' && password === '123456') {
        loginAdmin(true)
    } else {
        loginAdmin(false)
    }
}

const mapDispatchToProps = (dispatch) => ({
    login() {
        dispatch(actionCreators.setLogin(true))
    },
    toSignUp() {
        dispatch(actionCreators.setCurrPage('signUp'))
    },
    loginAdmin(isLogin) {
        dispatch(actionCreators.setAdmin(isLogin))
    }
})

export default connect(null, mapDispatchToProps)(function SignIn(props) {
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
                    onSubmit={(event) => {handleSubmit(event, props.login, props.loginAdmin)}}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
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
                    <Button
                        type="submit"
                        fullWidth
                        variant="outlined"
                        className={classes.submit}>
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
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

