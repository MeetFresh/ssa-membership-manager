import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import { connect } from 'react-redux';
import {actionCreators} from "./store";
import Checkbox from "@material-ui/core/Checkbox";
import {Divider} from "@material-ui/core";

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
            width: 1000,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    pic: {
        maxWidth: 300,
    }
}));

const mapPropsToState = (state) => ({
    checkoutItemList: state.getIn(['app', 'checkoutItemList'])
})

const mapPropsToDispatch = (dispatch) => ({
    handlePay(eventSet) {
        dispatch(actionCreators.clearCart());
        console.log(eventSet)
        eventSet.forEach((eventName) =>
            dispatch(actionCreators.addToCart(eventName))
        );
        dispatch(actionCreators.setCurrPage("checkout"))
    }
});

let selectedSet = new Set();

function EventComponent(props) {
    const classes = useStyles();

    const select = (eventName) => {
        if (selectedSet.has(eventName)) {
            selectedSet.delete(eventName);
        } else selectedSet.add(eventName);
    };

    return (
        <Grid container spacing={2} style={{marginBottom: 30}}>
            <Grid item xs={12} sm={8}>
                <Typography variant="h5" align="left" gutterBottom className={classes.title}>
                    Upcoming Event: {props.name}
                </Typography>
                <Typography variant="h6" align="left" gutterBottom className={classes.title}>
                    Price: ${props.price}
                </Typography>
                <Typography variant="body1" align="left">
                    {props.description}
                </Typography>

            </Grid>

            <Grid item container direction="column" xs={12} sm={4}>
                <Grid container alignItems="center"
                      justify="center">
                    <img className={classes.pic} src={props.picSrc}>
                    </img>
                    <Button
                        variant="outlined"
                        style={{
                            marginTop: 10,
                        }}
                        href={props.learnMoreLink}
                    >Learn More</Button>
                    <div style={{
                        marginTop: 10,
                        marginLeft: 20
                    }}>
                    <Typography variant="button">
                        Select
                    </Typography>
                    <Checkbox
                        color="default"
                        onChange={(e) =>
                            select(props.id)
                        }
                        inputProps={{ 'aria-label': 'checkbox with default color' }}
                    />
                    </div>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default connect(mapPropsToState, mapPropsToDispatch)(function Event(props) {
    const classes = useStyles();

    const handlePay = (eventSet) => {
        props.handlePay(eventSet)
    }

    selectedSet = new Set();

    return (
        <React.Fragment>
            <main className={classes.layout}>
                <Button
                    variant="outlined"
                    style={{
                        display: "flex",
                        marginTop: 10,
                        marginBottom: 10,
                        marginRight: 10,
                        marginLeft: 'auto',
                    }}
                    onClick={() => {handlePay(selectedSet)}}
                >Checkout</Button>
                {
                    props.checkoutItemList.toJS().filter(
                        (item) => (item.type === 'event')
                    ).map(
                        (item) => (
                            <EventComponent name = {item.name} id = {item.id}
                                description = {item.longDesc}
                                picSrc = {item.picSrc}
                                learnMoreLink = {item.learnMoreLink}
                                price = {item.price}
                            />
                        )
                    )
                }
            </main>
        </React.Fragment>
    );
})