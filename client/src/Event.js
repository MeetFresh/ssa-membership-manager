import React, {Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import { connect } from 'react-redux';
import {actionCreators} from "./store";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import {Divider} from "@material-ui/core";
import axios from 'axios'

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
    checkoutItemList: state.getIn(['app', 'checkoutItemList']),
    isAdmin: state.getIn(['app', 'isAdmin'])
})

const mapPropsToDispatch = (dispatch) => ({
    handlePay(eventSet) {
        dispatch(actionCreators.clearCart());
        eventSet.forEach((eventName) =>
            dispatch(actionCreators.addToCart(eventName))
        );
        dispatch(actionCreators.setCurrPage("checkout"))
    },
    saveEvent(eventId, eventContent) {
        const targetItem = {
            id: eventId,
            name: eventContent.name,
            type: eventContent.type,
            desc: 'SSA Event',
            longDesc: eventContent.description,
            price: Math.max(parseFloat(eventContent.price) || 0, 0),
            picSrc: eventContent.tempPicSrc,
            learnMoreLink: eventContent.learnMoreLink
        }
        axios.post('/edit-event', targetItem).then(res => {
            if (res.data.success) {
                dispatch(actionCreators.editCheckoutItemList(targetItem))
            }
        }).catch((err) => {
            dispatch(actionCreators.setConnectionError(true))
        })
    },
    deleteEvent(deletedId) {
        axios.post('/delete-event', {deletedId: deletedId}).then(res => {
            if (res.data.success) {
                dispatch(actionCreators.deleteCheckoutItemList(deletedId))
            }
        }).catch((err) => {
            dispatch(actionCreators.setConnectionError(true))
        })
    },
    addEvent() {
        axios.post('/new-event').then(res => {
            if (res.data.newId) {
                dispatch(actionCreators.addCheckoutItemList(res.data.newId))
            } else {
                dispatch(actionCreators.setConnectionError(true))
            }
        }).catch((err) => {
            dispatch(actionCreators.setConnectionError(true))
        })
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

    const [state, setState] = React.useState({
        tempPicSrc: props.picSrc,
        name: props.name,
        price: props.price,
        description: props.description,
        learnMoreLink: props.learnMoreLink,
        type: props.type
    })

    const handleChange = (event) => {
      const name = event.target.name;
      state[[name]] = event.target.value
      setState({...state})
    };

    const saveEvent = () => {
        props.saveEvent(props.id, state)
    }

    const deleteEvent = () => {
        props.deleteEvent(props.id)
    }

    return (
        <Grid container spacing={2} style={{marginBottom: 30}}>
            <Grid item xs={12} sm={8}>
                <Typography variant="h5" align="left" gutterBottom className={classes.title}>
                    {
                        !props.isEditing ? (
                            props.type === 'event' ? "Upcoming Event" : "Announcement"
                        ) : (
                            <Select className={classes.col}
                                native
                                value={state.type}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'type',
                                }}
                                style={{position: "relative", bottom: 2}}
                              >
                                <option value={"event"}>Upcoming Event</option>
                                <option value={'announcement'}>Announcement</option>
                            </Select>
                        )
                    } : {
                        props.isEditing ?
                        <TextField
                            id={props.id + "-name"}
                            style={{width: 450}}
                            onChange={handleChange}
                            inputProps={{
                                name: 'name'
                            }}
                            defaultValue={props.name}
                        /> : props.name
                    }
                </Typography>
                {
                    state.type === 'event' ?
                    <Typography variant="h6" align="left" gutterBottom className={classes.title}>
                        Price: $ {
                            props.isEditing ?
                            <TextField
                                id={props.id + "-price"}
                                style={{width: 100}}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'price'
                                }}
                                defaultValue={props.price.toFixed(2)}
                            /> : props.price.toFixed(2)
                        }
                    </Typography> : null
                }
                <Typography variant="body1" align="left">
                    {
                        props.isEditing ?
                        <TextField
                            placeholder="Description"
                            multiline
                            rows={10}
                            rowsMax={10}
                            style={{width: 640}}
                            variant="outlined"
                            onChange={handleChange}
                            inputProps={{
                                name: 'description'
                            }}
                            defaultValue={props.description}
                        /> : props.description
                    }
                </Typography>
                {
                    props.isEditing ?
                    <Typography variant="h6" align="left" gutterBottom className={classes.title}>
                        External URL:
                        <TextField
                            id={props.id + "-learn-more-link"}
                            style={{width: 450, marginLeft: 5}}
                            onChange={handleChange}
                            inputProps={{
                                name: 'learnMoreLink'
                            }}
                            defaultValue={props.learnMoreLink}
                        />
                    </Typography> : null
                }
            </Grid>

            <Grid item container direction="column" xs={12} sm={4}>
                <Grid container alignItems="center" justify="center">
                    {
                        props.isEditing ?
                        <div>
                            <TextField
                                id={props.id + "-image-url"}
                                style={{width: 300, marginBottom: 10}}
                                onChange={handleChange}
                                inputProps={{
                                    name: "tempPicSrc"
                                }}
                                placeholder="Paste Image URL"
                                defaultValue={props.picSrc}
                            />
                            {
                                state.tempPicSrc === '' ? null :
                                <img alt="Image Not Found" className={classes.pic} src={state.tempPicSrc} />
                            }
                        </div> : props.picSrc !== '' ? <img className={classes.pic} src={props.picSrc}/> : null
                    }
                    {
                        !props.isAdmin ? (
                            <Fragment>
                                {
                                    props.learnMoreLink !== '' ?
                                    <Button
                                        variant="outlined"
                                        style={{
                                            marginTop: 10,
                                        }}
                                        href={props.learnMoreLink}
                                    >Learn More</Button> : null
                                }
                                {
                                    props.type === 'event' ?
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
                                    </div> : null
                                }
                            </Fragment>
                        ) : (
                            <Fragment>
                                <Button
                                    variant="outlined"
                                    style={{
                                        marginTop: 10,
                                        marginRight: 10
                                    }}
                                    onClick={deleteEvent}
                                >Delete</Button>
                                {
                                    props.isEditing ?
                                    <Button
                                        variant="outlined"
                                        style={{
                                            marginLeft: 10,
                                            marginTop: 10
                                        }}
                                        onClick={() => {saveEvent(); props.setEditing(props.id)}}
                                    >Save</Button> :
                                    <Button
                                        variant="outlined"
                                        style={{
                                            marginLeft: 10,
                                            marginTop: 10
                                        }}
                                        onClick={() => {props.setEditing(props.id)}}
                                    >Edit</Button>
                                }
                                
                            </Fragment>
                        )
                    }
                </Grid>
            </Grid>
        </Grid>
    );
}

export default connect(mapPropsToState, mapPropsToDispatch)(function Event(props) {
    const classes = useStyles();

    const [state, setState] = React.useState({
        isEditing: props.checkoutItemList.toJS().filter(
            (item) => (item.type === 'event' || item.type === 'announcement')
        ).map((item) => (item.id)).reduce((a,b)=> (a[b]=false,a),{})
    })

    const handleChange = (event) => {
      const name = event.target.name;
      state[[name]] = event.target.value
      setState({...state})
    };

    const handlePay = (eventSet) => {
        props.handlePay(eventSet)
    }

    selectedSet = new Set();

    return (
        <React.Fragment>
            <main className={classes.layout}>
                {
                    props.isAdmin ? <Button
                        variant="outlined"
                        style={{
                            display: "flex",
                            marginTop: 10,
                            marginBottom: 10,
                            marginRight: 10,
                            marginLeft: 'auto',
                        }}
                        onClick={() => {props.addEvent()}}
                    >New Event/Announcement</Button> :
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
                }
                {
                    props.checkoutItemList.toJS().filter(
                        (item) => (item.type === 'event' || item.type === 'announcement')
                    ).map(
                        (item) => (
                            <EventComponent
                                key={"event-list-" + item.id}
                                name = {item.name}
                                id = {item.id}
                                type= {item.type}
                                description = {item.longDesc}
                                picSrc = {item.picSrc}
                                learnMoreLink = {item.learnMoreLink}
                                price = {item.price}
                                isAdmin = {props.isAdmin}
                                isEditing = {state.isEditing[item.id]}
                                saveEvent = {props.saveEvent}
                                deleteEvent = {props.deleteEvent}
                                setEditing = {(id) => {state.isEditing[id] = !state.isEditing[id]; setState({...state})}}
                            />
                        )
                    )
                }
            </main>
        </React.Fragment>
    );
})