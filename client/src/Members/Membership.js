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
import {actionCreators} from "../store";
import {connect} from "react-redux";

const membership = [
    { name: 'Status:', desc: 'some description', value: 'Student' },
    { name: 'Expire Time:', desc: 'some description', value: '08/31/2021' },
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
    subscribe() {
        dispatch(actionCreators.setCurrPage("checkout"))
    },
    changePic() {
        dispatch(actionCreators.setCurrPage('changePic'))
    }
})

export default connect(null, mapDispatchToProps)(function Membership(props) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <main className={classes.layout}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h5" gutterBottom className={classes.title}>
                        My Membership
                    </Typography>
                    <List disablePadding>
                        {membership.map((membership) => (
                            <ListItem className={classes.listItem} key={membership.name}>
                                <ListItemText primary={membership.name} secondary={membership.desc} />
                                <Typography variant="body2">{membership.value}</Typography>
                            </ListItem>
                        ))}
                    </List>
                    <Button
                        variant="contained" color="primary"
                        style={{
                            marginTop: 10,
                        }}
                        onClick={() => {props.subscribe()}}
                    >Subscribe</Button>
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
                            // onClick={() => {props.changePic()}}
                        >Change My Picture</Button>
                    </Grid>
                </Grid>
                <Typography variant="body2">
                Some Description about the membership fee. Some Description about the membership fee. Some Description about the membership fee. Some Description about the membership fee. Some Description about the membership fee.
                </Typography>
            </Grid>

            </main>
        </React.Fragment>
    );
})