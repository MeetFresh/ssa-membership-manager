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
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { connect } from 'react-redux'
import {actionCreators} from './store'

import { ThemeProvider } from '@material-ui/core/styles';
import {theme} from './theme';

import { createUser } from './queries';
import axios from 'axios';
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

function handleSubmit(event, props) {
  event.preventDefault()
  const formData = new FormData(event.target)
  const SIGNUP_API = '/api/user'
  axios.post(SIGNUP_API, formData).then(res => {
    props.closeDuplicateEmail()
    props.openSignUpSuccess()
    props.togglePage('')
  }).catch(err => {
    props.openDuplicateEmail()
  })
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#888888',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const mapDispatchToProps = (dispatch) => ({
  toSignIn() {
      dispatch(actionCreators.setCurrPage(''))
  },
  openConnectionError() {
    dispatch(actionCreators.setConnectionError(true))
  },
  openDuplicateEmail() {
    dispatch(actionCreators.setDuplicateEmail(true))
  },
  closeDuplicateEmail() {
    dispatch(actionCreators.setDuplicateEmail(false))
  },
  openSignUpSuccess() {
    dispatch(actionCreators.setSignUpSuccess(true))
  },
  togglePage(pageName) {
    dispatch(actionCreators.setCurrPage(pageName))
  }
})

const mapStateToProps = (state) => ({
  duplicateEmail: state.getIn(['app', 'duplicateEmail'])
})

export default connect(mapStateToProps, mapDispatchToProps)(function SignUp(props) {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <ThemeProvider theme={theme}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form
          className={classes.form}
          action='/api/user'
          method='post'
          onSubmit={(event) => {handleSubmit(event, props)}}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
            { props.duplicateEmail ? 
              <Alert
                  severity="warning"
                  onClose={() => {props.closeDuplicateEmail()}}
              >
                  <AlertTitle>This email has signed up. Try another one.</AlertTitle>
              </Alert> : null
            }
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2" onClick={() => {props.toSignIn()}}>
                Already have an account? Sign in
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