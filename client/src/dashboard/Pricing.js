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
import TextField from "@material-ui/core/TextField";
import axios from 'axios';

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
    editMembershipPrice(priceDict) {
        dispatch(actionCreators.editMembershipPrice(priceDict))
    },
    openConnectionError() {
        dispatch(actionCreators.setConnectionError(true))
    }
})

const mapStateToProps = (state) => ({
    checkoutItemList: state.getIn(['app', 'checkoutItemList'])
})

export default connect(mapStateToProps, mapDispatchToProps)(function Profile(props) {
    const classes = useStyles();

    const memberTypeList = ['undergrad', 'graduate', 'nt-faculty', 'faculty', 'postdoc', 'scholar']
    let defaultPriceDict = {}
    memberTypeList.forEach((memberType) => {
        defaultPriceDict[memberType] = props.checkoutItemList.toJS().filter(item => item.id === memberType + '-membership')[0].price
    })

    const [state, setState] = React.useState({
        isEdit: false,
        undergradPrice: defaultPriceDict['undergrad'],
        graduatePrice: defaultPriceDict['graduate'],
        ntFacultyPrice: defaultPriceDict['nt-faculty'],
        facultyPrice: defaultPriceDict['faculty'],
        postdocPrice: defaultPriceDict['postdoc'],
        scholarPrice: defaultPriceDict['scholar']
    })

    const handleChange = (event) => {
        const name = event.target.name
        state[[name]] = event.target.value
        setState({...state})
      };

    function savePrice(state) {
        const {undergradPrice, graduatePrice, ntFacultyPrice, facultyPrice, postdocPrice, scholarPrice} = state
        const priceDict = {undergradPrice, graduatePrice, ntFacultyPrice, facultyPrice, postdocPrice, scholarPrice}
        const backPriceDict = {
            "Undergrad": undergradPrice,
            "Graduate": graduatePrice,
            "NT-Faculty": ntFacultyPrice,
            "Faculty": facultyPrice,
            "Postdoc": postdocPrice,
            "scholar": scholarPrice
        }
        console.log(backPriceDict)
        axios.put('/api/member', backPriceDict).then(res => {
            props.editMembershipPrice(priceDict)
        }).catch(err => {
            props.openConnectionError()
        })
    }

    return (
        <React.Fragment>
            <main className={classes.layout}>
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h5" gutterBottom className={classes.title}>
                            Membership Pricing
                        </Typography>
                        <List disablePadding>
                            
                            <ListItem className={classes.listItem}>
                                <ListItemText primary='Undergrad' />
                                <Typography variant="body3">
                                    <span style={{position: "relative", top: state.isEdit ? 6 : 0}}>$</span>
                                    { state.isEdit ?
                                        <TextField
                                            id="undergrad-price"
                                            style={{width: 100}}
                                            onChange={(event) => {handleChange({target: {name: "undergradPrice", value: event.target.value}})}}
                                            inputProps={{
                                                name: 'undergradPrice'
                                            }}
                                            defaultValue={defaultPriceDict['undergrad'].toFixed(2)}
                                            inputProps={{min: 0, style: { textAlign: 'right' }}}
                                        /> : defaultPriceDict['undergrad'].toFixed(2)
                                    }
                                </Typography>
                            </ListItem>
                            <ListItem className={classes.listItem}>
                                <ListItemText primary='Graduate' />
                                <Typography variant="body3">
                                    <span style={{position: "relative", top: state.isEdit ? 6 : 0}}>$</span>
                                    { state.isEdit ?
                                        <TextField
                                            id={"graduate-price"}
                                            style={{width: 100}}
                                            onChange={(event) => {handleChange({target: {name: "graduatePrice", value: event.target.value}})}}
                                            inputProps={{
                                                name: 'graduatePrice'
                                            }}
                                            defaultValue={defaultPriceDict['graduate'].toFixed(2)}
                                            inputProps={{min: 0, style: { textAlign: 'right' }}}
                                        /> : defaultPriceDict['graduate'].toFixed(2)
                                    }
                                </Typography>
                            </ListItem>
                            <ListItem className={classes.listItem}>
                                <ListItemText primary='NT-Faculty' />
                                <Typography variant="body3">
                                    <span style={{position: "relative", top: state.isEdit ? 6 : 0}}>$</span>
                                    { state.isEdit ?
                                        <TextField
                                            id={"nt-faculty-price"}
                                            style={{width: 100}}
                                            onChange={(event) => {handleChange({target: {name: "ntFacultyPrice", value: event.target.value}})}}
                                            inputProps={{
                                                name: 'ntFacultyPrice'
                                            }}
                                            defaultValue={defaultPriceDict['nt-faculty'].toFixed(2)}
                                            inputProps={{min: 0, style: { textAlign: 'right' }}}
                                        /> : defaultPriceDict['nt-faculty'].toFixed(2)
                                    }
                                </Typography>
                            </ListItem>
                            <ListItem className={classes.listItem}>
                                <ListItemText primary='Faculty' />
                                <Typography variant="body3">
                                    <span style={{position: "relative", top: state.isEdit ? 6 : 0}}>$</span>
                                    { state.isEdit ?
                                        <TextField
                                            id={"faculty-price"}
                                            style={{width: 100}}
                                            onChange={(event) => {handleChange({target: {name: "facultyPrice", value: event.target.value}})}}
                                            inputProps={{
                                                name: 'facultyPrice'
                                            }}
                                            defaultValue={defaultPriceDict['faculty'].toFixed(2)}
                                            inputProps={{min: 0, style: { textAlign: 'right' }}}
                                        /> : defaultPriceDict['faculty'].toFixed(2)
                                    }
                                </Typography>
                            </ListItem>
                            <ListItem className={classes.listItem}>
                                <ListItemText primary='Postdoc' />
                                <Typography variant="body3">
                                    <span style={{position: "relative", top: state.isEdit ? 6 : 0}}>$</span>
                                    { state.isEdit ?
                                        <TextField
                                            id={"postdoc-price"}
                                            style={{width: 100}}
                                            onChange={(event) => {handleChange({target: {name: "postdocPrice", value: event.target.value}})}}
                                            inputProps={{
                                                name: 'postdocPrice'
                                            }}
                                            defaultValue={defaultPriceDict['postdoc'].toFixed(2)}
                                            inputProps={{min: 0, style: { textAlign: 'right' }}}
                                        /> : defaultPriceDict['postdoc'].toFixed(2)
                                    }
                                </Typography>
                            </ListItem>
                            <ListItem className={classes.listItem}>
                                <ListItemText primary='Scholar' />
                                <Typography variant="body3">
                                    <span style={{position: "relative", top: state.isEdit ? 6 : 0}}>$</span>
                                    { state.isEdit ?
                                        <TextField
                                            id={"scholar-price"}
                                            style={{width: 100}}
                                            onChange={(event) => {handleChange({target: {name: "scholarPrice", value: event.target.value}})}}
                                            inputProps={{
                                                name: 'scholarPrice'
                                            }}
                                            defaultValue={defaultPriceDict['scholar'].toFixed(2)}
                                            inputProps={{min: 0, style: { textAlign: 'right' }}}
                                        /> : defaultPriceDict['scholar'].toFixed(2)
                                    }
                                </Typography>
                            </ListItem>
                        </List>
                        {
                            state.isEdit ? 
                            <Button
                                variant="outlined"
                                style={{
                                    marginTop: 10,
                                }}
                                onClick={() => {
                                    savePrice(state)
                                    handleChange({target: {name: "isEdit", value: false}})
                                }}
                            >Save</Button> :
                            <Button
                                variant="outlined"
                                style={{
                                    marginTop: 10,
                                }}
                                onClick={() => {handleChange({target: {name: "isEdit", value: true}})}}
                            >Edit</Button>
                        }
                        
                    </Grid>
                </Grid>

            </main>
        </React.Fragment>
    );
});