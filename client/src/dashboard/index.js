import React, { Fragment } from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {how2Join, linksListItems, mainListItems, secondaryListItems} from './listItems';
import {TypographyTypeMap as align} from "@material-ui/core/Typography/Typography";
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import AddressForm from '../Payment/AddressForm'
import PaymentForm from '../Payment/PaymentForm'
import Checkout from '../Payment/Checkout'
import Profile from '../Members/Profile';
import Membership from '../Members/Membership';
import EditProfile from '../Members/EditProfile';
import Event from '../Event';
import Review from '../Payment/Review'
import Button from "@material-ui/core/Button";
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import logo from '../img/SSALogo.png';
import MailingList from './MailingList'
import MemberList from './MemberList'
import Pricing from './Pricing'

import { connect } from 'react-redux'
import {actionCreators} from '../store'
import { Elements } from '@stripe/react-stripe-js';
import { Route, Switch, Redirect } from 'react-router-dom'

import axios from 'axios'


import { loadStripe } from "@stripe/stripe-js";
const promise = loadStripe("pk_test_51HKUBkCT0gTsZJ1O7Z5eOtt5HwxFFk1Mh6RDeVer8wxM5ioHdLohr4HovlxrdDW9SBZIQvSeOX3xbqnK3e4cOQVx00F3k0i43R");

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme
            .transitions
            .create([
                'width', 'margin'
            ], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            })
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme
            .transitions
            .create([
                'width', 'margin'
            ], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            })
    },
    menuButton: {
        marginRight: 36
    },
    menuButtonHidden: {
        display: 'none'
    },
    title: {
        flexGrow: 1
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme
            .transitions
            .create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            })
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme
            .transitions
            .create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
        width: theme.spacing(7),
        [
            theme
                .breakpoints
                .up('sm')
        ]: {
            width: theme.spacing(9)
        }
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto'
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4)
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column'
    },
    fixedHeight: {
        height: 240
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }

}));

const CheckoutWrapper = function(props) {
    return (
        <div align="center">
            <Elements stripe={promise}>
                <Checkout/>
            </Elements>
        </div>
    )
}

const mapStateToProps = (state) => ({
  loggedIn: state.getIn(['app', 'loggedIn']),
  currPage: state.getIn(['app', 'currPage']),
  isAdmin: state.getIn(['app', 'isAdmin']),
  connectionError: state.getIn(['app', 'connectionError']),
  wrongCredentials: state.getIn(['app', 'wrongCredentials'])
})

const mapDispatchToProps = (dispatch) => ({
  logout() {
      dispatch(actionCreators.setLogin(false))
      dispatch(actionCreators.setAdmin(false))
      dispatch(actionCreators.setCurrPage(''))
  },
  togglePage(pageName) {
      dispatch(actionCreators.setCurrPage(pageName))
  },
  closeConnectionError() {
      dispatch(actionCreators.setConnectionError(false))
  },
  closeCredentialError() {
      dispatch(actionCreators.setWrongCredentials(false))
  }
})

function handleLogout(logout) {
    axios.get('/api/logout').then(res => {
        logout();
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(function Dashboard(props) {
    const classes = useStyles();
    const [open,
        setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar
                position="absolute"
                className={clsx(classes.appBar, open && classes.appBarShift)}
                style={{ background: '#FFFFFF' }}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}>
                        <MenuIcon style={{fill: "gray"}}/>
                    </IconButton>

                    {
                      props.loggedIn ?
                      <Fragment>
                      {
                          !props.isAdmin ?
                              <Button
                                  variant="outlined"
                                  style={{
                                      marginRight: 10
                                  }}
                                  onClick={() => {
                                      props.togglePage('profile')
                                  }}
                              >Profile</Button> : null
                      }
                      {
                          !props.isAdmin ?
                            <Button
                                variant="outlined"
                                style={{
                                    marginRight: 10
                                }}
                                onClick={() => {props.togglePage('membership')}}
                            >Membership</Button> : null
                      }
                      <Button
                          variant="outlined"
                          style={{
                              marginRight: 10
                          }}
                          onClick={() => {props.togglePage('event')}}
                      >Event/Announcement</Button>
                      {
                          !props.isAdmin ? null :
                              <Button
                                  variant="outlined"
                                  style={{
                                      marginRight: 10
                                  }}
                                  onClick={() => {props.togglePage('mailing-list')}}
                              >Mailing List</Button>
                      }
                      {
                          !props.isAdmin ? null :
                              <Button
                                  variant="outlined"
                                  style={{
                                      marginRight: 10
                                  }}
                                  onClick={() => {props.togglePage('member-info')}}
                              >Member Info</Button>
                      }
                      {
                          !props.isAdmin ? null :
                              <Button
                                  variant="outlined"
                                  style={{
                                      marginRight: 10
                                  }}
                                  onClick={() => {props.togglePage('membership-pricing')}}
                              >Membership Pricing</Button>
                      }
                      {
                          !props.isAdmin ? null :
                              <Button
                                  variant="outlined"
                                  style={{
                                      marginRight: 10
                                  }}
                                  href="http://stripe.com/"
                              >Transactions</Button>
                      }
                      </Fragment> : null
                    }
                  
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        className={classes.title}>
                    </Typography>

                    <Button
                        variant="outlined"
                        style={{
                        marginRight: 10
                    }}>About Us</Button>
                    {
                      props.loggedIn ? (
                        <Button
                          variant="outlined"
                          style={{ marginRight: 10 }}
                        onClick={ () => { handleLogout(props.logout)} }
                        >Log Out</Button>
                      ) : (
                        props.currPage !== 'signup' ?
                        <Button
                          variant="outlined"
                          style={{
                            marginRight: 10
                          }}
                          onClick={ () => { props.togglePage('signup') } }
                        >Sign Up</Button>
                        :
                        <Button
                          variant="outlined"
                          style={{
                            marginRight: 10
                          }}
                          onClick={ () => { props.togglePage('') } }
                        >Sign In</Button>
                      )
                    }
        
                    {/*<IconButton color="inherit">*/}
                    {/*<Badge badgeContent={4} color="secondary">*/}
                    {/*<NotificationsIcon />*/}
                    {/*</Badge>*/}
                    {/*</IconButton>*/}

                </Toolbar>
                {
                    props.connectionError ? 
                    <Alert
                        severity="error"
                        onClose={() => {props.closeConnectionError()}}
                    >
                        <AlertTitle>Oops, something went wrong. <strong>Check Internet connection and reload page later</strong>.</AlertTitle>
                    </Alert> : null
                }
            </AppBar>

            <Drawer
                variant="permanent"
                classes={{
                paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
            }}
                open={open}>
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon/>
                    </IconButton>
                </div>
                <Divider/>
                <List>{linksListItems}</List>
                <Divider/>
                <List>{how2Join}</List>
                <Divider/>
                <List>{secondaryListItems}</List>

            </Drawer>

            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <h1 className={classes.header}>
                    {
                        props.isAdmin ? "Welcome, SSA Admin!" : "Welcome to SSA Website!"
                    }
                </h1>
                {/* {
                  getPageDisplay(props)
                } */}
                <Redirect to={"/" + props.currPage} push />
                {
                    props.loggedIn ?
                    <Switch>
                        <Route path="/profile" component={Profile} />
                        <Route path="/membership" component={Membership} />
                        <Route path="/checkout" component={CheckoutWrapper} />
                        <Route path="/event" component={Event} />
                        <Route path="/edit-profile" component={EditProfile} />
                        <Route path="/mailing-list" component={MailingList} />
                        <Route path="/member-info" component={MemberList} />
                        <Route path="/membership-pricing" component={Pricing} />
                    </Switch> :
                    props.currPage === 'signup' ?
                    <SignUp /> : <SignIn />
                }
            </main>

            
        </div>
    );
})