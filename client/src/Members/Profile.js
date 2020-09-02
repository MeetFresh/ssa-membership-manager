import React from 'react';
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


// const profile = [
//     { name: 'Name', value: 'First Last' },
//     { name: 'Gender', value: 'Male' },
//     { name: 'Membership Status', value: 'Student' },
//     { name: 'Institue', value: 'Georgia Tech' },
//     { name: 'Email', value: 'myemail@gatech.edu' },
// ];


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
    editProfile() {
        dispatch(actionCreators.setCurrPage("editProfile"))
    },
    changePic() {
        dispatch(actionCreators.setCurrPage('changePic'))
    }
})

const mapStateToProps = (state) => ({
    profile: state.getIn(['app', 'profile'])
})

export default connect(mapStateToProps, mapDispatchToProps)(function Profile(props) {
    const classes = useStyles();
    const profile = props.profile.toJS()

    return (
        <React.Fragment>
            <main className={classes.layout}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h5" gutterBottom className={classes.title}>
                            My Profile
                        </Typography>
                        <List disablePadding>
                            
                            <ListItem className={classes.listItem}>
                                <ListItemText primary='Name' />
                                <Typography variant="body2">{profile.first + ' ' + profile.last}</Typography>
                            </ListItem>
                            <ListItem className={classes.listItem}>
                                <ListItemText primary='Pronoun' />
                                <Typography variant="body2">{profile.pronoun}</Typography>
                            </ListItem>
                            <ListItem className={classes.listItem}>
                                <ListItemText primary='Membership Status' />
                                <Typography variant="body2">{profile.status}</Typography>
                            </ListItem>
                            {
                                profile.institute ?
                                <ListItem className={classes.listItem}>
                                    <ListItemText primary='Institute' />
                                    <Typography variant="body2">{profile.institute}</Typography>
                                </ListItem> : null
                            }
                            {
                                profile.instituteId ?
                                <ListItem className={classes.listItem}>
                                    <ListItemText primary='Institute ID' />
                                    <Typography variant="body2">{profile.instituteId}</Typography>
                                </ListItem> : null
                            }
                            <ListItem className={classes.listItem}>
                                <ListItemText primary='Email' />
                                <Typography variant="body2">{profile.email}</Typography>
                            </ListItem>
                            
                        </List>
                        <Button
                            variant="contained" color="primary"
                            style={{
                                marginTop: 10,
                            }}
                            onClick={() => {props.editProfile()}}
                        >Edit</Button>
                    </Grid>

                    <Grid item container direction="column" xs={12} sm={6}>
                        <Grid container alignItems="center"
                              justify="center">
                            <img className={classes.pic} src={"https://upload.wikimedia.org/wikipedia/en/thumb/6/6c/Georgia_Tech%27s_Buzz_logo.svg/1200px-Georgia_Tech%27s_Buzz_logo.svg.png"}>
                            </img>
                            <Button
                                variant="contained" color="primary"
                                style={{
                                    marginTop: 10,
                                }}
                                onClick={() => {props.changePic()}}
                            >Change My Picture</Button>
                        </Grid>
                    </Grid>
                </Grid>

            </main>
        </React.Fragment>
    );
});