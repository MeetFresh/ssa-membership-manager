import React, { Fragment } from 'react';
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
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import validator from 'email-validator'
import {profile} from "./profileList";
import { ThemeProvider } from '@material-ui/core/styles';
import {theme} from '../theme';
import axios from 'axios'
import Avatar from "@material-ui/core/Avatar";

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
        [theme.breakpoints.up(1000 + theme.spacing(2) * 2)]: {
            width: 1000,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    grid: {
        marginTop: theme.spacing(1),
    },
    btn: {
        margin: theme.spacing(2),
    },
    col: {
        paddingTop: 15,
        paddingBottom: 0,
    },
    pic: {
        marginTop: theme.spacing(2),
        width: 130,
        height: 130,
        borderRadius: '50%',
        borderColor: 'rgba(220, 220, 220, 1)',
        borderStyle: 'solid',
    },
    pimg: {
        padding: "1em",
        '&:hover': {
            boxShadow: "0 0 2px 1px rgba(220, 220, 220, 1)",
        }
    }

}));


const mapDispatchToProps = (dispatch) => ({
    saveProfile(state, event) {
        //do something to save the input

        profile.profilePic = state.profilePic;
        
        const formData = new FormData(event.target)
        const UPDATE_PROFILE_API = '/api/user'
        axios.put(
            UPDATE_PROFILE_API, formData,
            {'Content-Type': 'multipart/form-data'}
        ).then(res => {
            dispatch(actionCreators.setProfile(profile))
            dispatch(actionCreators.setCurrPage("profile"))
        }).catch(err => {
            console.log(err)
            dispatch(actionCreators.setConnectionError(true))
        })
    },
    goProfile() {
        dispatch(actionCreators.setCurrPage("profile"))
    },
})

const mapStateToProps = (state) => ({
    profile: state.getIn(['app', 'profile'])
});

let profilePics = [];

const importAll = (r) => {
    return r.keys().map(r);
}

profilePics = importAll(require.context('../img/profilePics/', false, /\.(png|jpe?g|svg)$/));
console.log(profilePics);

export default connect(mapStateToProps, mapDispatchToProps)(function EditProfile(props) {
    const classes = useStyles();
    const profile = props.profile.toJS()
    const [state, setState] = React.useState({
        profilePic: profile.profilePic || 'row-1-col-1',
    });

    const handleChange = (event) => {
        const name = event.target.name;
        state[[name]] = event.target.value
        setState({...state})
    };

    return (
        <React.Fragment>
            <main className={classes.layout}>
                <ThemeProvider theme={theme}>
                <Typography variant="h5" gutterBottom className={classes.title}>
                    Choose My Profile Picture
                </Typography>


                <form
                    noValidate autoComplete="off"
                    className={classes.btn}
                    onSubmit={(event) => {
                            props.saveProfile(state, event)
                    }}
                >
                    <img className={classes.pic} src={require('../img/profilePics/' + state.profilePic + '.png')}>
                    </img>
                    <br/>
                    <Button className={classes.btn}
                            variant="outlined"
                            style={{
                                marginTop: 30,
                            }}
                            onClick={() => {props.goProfile()}}
                    >Back</Button>

                    <Button className={classes.btn}
                            variant="outlined"
                            style={{
                                marginTop: 30,
                            }}
                            type="submit"
                    >Save</Button>

                    <div>
                        {
                            profilePics.map(
                                (image, index) =>
                                    <img key={index} src={image} alt="info" width="130"
                                              className={classes.pimg}
                                              onClick={() => {state.profilePic = image.substring(14,25);
                                                        setState({...state});}}>
                                    </img>
                            )
                        }
                    </div>
                    <a style={{color: "black"}} href="http://www.freepik.com">Designed by vectorpocket / Freepik</a>

                </form>
                </ThemeProvider>
            </main>
        </React.Fragment>
    );
});
