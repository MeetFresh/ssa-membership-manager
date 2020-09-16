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

export default connect(null, mapPropsToDispatch)(function Event(props) {
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
                <EventComponent name = "2021 Summer School" id = 'summer-school'
                    description = " There will be no better—more energizing, more community-building, more hopeful, more enlightening—way
                    to spend a week of your summer. Whether you are an undergraduate/Master/PhD student, an early career academic,
                    a tenured faculty person, or someone outside of the academy altogether, the Society for the
                    Study of Affect Summer Seminars provides an amazing opportunity to learn, interact, and create
                    alongside two dozen of the most engaging folks (established and up-and-coming scholars) working
                    in/around affect studies from all around the world. Come be a participant!
                    "
                    picSrc = "https://pbs.twimg.com/media/DTwKMqbXcAEugcd.jpg"
                    learnMoreLink = 'http://affectsociety.com/#register2'
                />

                <EventComponent name = "2021 SSA Conference" id = 'ssa-conference'
                                description = " This conference seeks submissions that are shorter in length than most academic journal articles:
                                generally essays in the range of 500-5000 words. The journal will continuously accept submissions on
                                an ever-rolling basis and ‘publish’ them to the site after they have gone through the double-blind review process,
                                been copy-edited, formatted, etc. Once five or six reviewed articles have been posted at the website, the journal
                                will gather them together as a single downloadable ‘issue’ and, given the respective contents of that particular
                                issue, recruit an appropriately resonant member from our editorial board to write an introduction or afterword that
                                captures some of the key aspects and arguments raised across the assembled pieces."
                                picSrc = "https://pbs.twimg.com/media/DTwKMqbXcAEugcd.jpg"
                                learnMoreLink = 'http://capaciousjournal.com/submit/submit-an-article/'
                />

            </main>
        </React.Fragment>
    );
})