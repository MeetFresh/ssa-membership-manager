import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import {actionCreators} from "../store";
import {connect} from "react-redux";

const membership = [
    { name: 'Status:', desc: 'Decides your subscription rate', value: 'Undergrad' },
    { name: 'Expire Time:', desc: 'Pay to continue as a member!', value: '08/31/2021' },
];

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
            width: 600,
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
    subscribe(status) {
        dispatch(actionCreators.clearCart())
        dispatch(actionCreators.addToCart(status + '-membership'))
        dispatch(actionCreators.setCurrPage("checkout"))
    },
    changePic() {
        dispatch(actionCreators.setCurrPage('changePic'))
    }
})

const mapStateToProps = (state) => ({
    profile: state.getIn(['app', 'profile'])
})

export default connect(mapStateToProps, mapDispatchToProps)(function Membership(props) {
    const classes = useStyles();
    const profile = props.profile.toJS()

    const history = profile.history
    let expiration = "N/A"
    if (history.length > 0) {
        expiration = (new Date(history[history.length - 1].split(",")[2])).toDateString()
    }

    return (
        <React.Fragment>
            <main className={classes.layout}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h5" gutterBottom className={classes.title}>
                        My Membership
                    </Typography>
                    <List disablePadding>
                        <ListItem className={classes.listItem}>
                            <ListItemText primary={membership[0].name} secondary={membership[0].desc} />
                            <Typography variant="body2">{profile.status || 'N/A'}</Typography>
                        </ListItem>
                        <ListItem className={classes.listItem}>
                            <ListItemText primary={membership[1].name} secondary={membership[1].desc} />
                            <Typography variant="body2">{expiration}</Typography>
                        </ListItem>
                    </List>
                    <Button
                        variant="outlined"
                        style={{
                            marginTop: 10,
                        }}
                        onClick={() => {props.subscribe(profile.status)}}
                        disabled={profile.status === '' || profile.status === 'non-member'}
                    >Subscribe</Button>
                </Grid>

                <Grid item container direction="column" xs={12} sm={6}>
                    <Grid container alignItems="center"
                          justify="center">
                        {
                            profile.profilePic ?
                            <img className={classes.pic} src={require('../img/profilePics/' + profile.profilePic + '.png')} />
                            : null
                        }
                    </Grid>
                </Grid>
                <Typography variant="body2">
                    {   
                        profile.status !== '' && profile.status !== 'non-member' ?
                        "You are about to subscribe as " + profile.status + "."
                        : 'Oops, seems you have not declared your status yet. You should claim one in your Profile.'
                    }
                    
                </Typography>
            </Grid>

            </main>
        </React.Fragment>
    );
})