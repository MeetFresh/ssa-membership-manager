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
import InputAdornment from "@material-ui/core/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import {profile} from "./profileList";

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
        [theme.breakpoints.up(500 + theme.spacing(2) * 2)]: {
            width: 500,
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
    }
}));

const mapDispatchToProps = (dispatch) => ({
    saveProfile() {
        //do something to save the input
        dispatch(actionCreators.setCurrPage("profile"))
    },
    goProfile() {
        dispatch(actionCreators.setCurrPage("profile"))
    },
})

export default connect(null, mapDispatchToProps)(function EditProfile(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        gender: '',
        status: '',
        name: 'hai',
    });

    const handleChange = (event) => {
        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value,
        });
    };

    return (
        <React.Fragment>
            <main className={classes.layout}>
                <Typography variant="h5" gutterBottom className={classes.title}>
                    Edit My Profile
                </Typography>

                <form noValidate autoComplete="off" className={classes.btn}>
                    <Grid container spacing={2}>
                        <Grid container spacing={1} className={classes.grid}>
                            <Grid item sm={6}>
                                <Typography variant="subtitle1" gutterBottom className={classes.col} align="left">
                                    First Name
                                </Typography>
                            </Grid>
                            <Grid item sm={6}>
                                <TextField id="standard-basic" label="First" fullWidth="true" defaultValue={"First"}/>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1}  className={classes.grid}>
                            <Grid item sm={6}>
                                <Typography variant="subtitle1" gutterBottom className={classes.col} align="left">
                                    Last Name
                                </Typography>
                            </Grid>
                            <Grid item sm={6}>
                                <TextField id="standard-basic" label="Last" fullWidth="true" defaultValue={"Last"}/>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1}  className={classes.grid}>
                            <Grid item sm={6}>
                                <Typography variant="subtitle1" gutterBottom className={classes.col} align="left">
                                    Gender
                                </Typography>
                            </Grid>
                            <Grid item sm={6}>
                                <Select className={classes.col}
                                        native
                                        fullWidth="true"
                                        value={state.gender}
                                        onChange={handleChange}
                                        inputProps={{
                                            name: 'gender',
                                        }}
                                >
                                    <option aria-label="None" value="" />
                                    <option value={'male'}>Male</option>
                                    <option value={'female'}>Female</option>
                                    <option value={'non-binary'}>Non-Binary</option>
                                </Select>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1}  className={classes.grid}>
                            <Grid item sm={6}>
                                <Typography variant="subtitle1" gutterBottom className={classes.col} align="left">
                                    Status
                                </Typography>
                            </Grid>
                            <Grid item sm={6}>
                                <Select className={classes.col}
                                    native
                                    fullWidth="true"
                                    value={state.status}
                                    onChange={handleChange}
                                    inputProps={{
                                        name: 'status',
                                    }}
                                >
                                    <option aria-label="None" value="" />
                                    <option value={'student'}>Student</option>
                                    <option value={'faculty'}>Faculty</option>
                                    <option value={'other'}>Other</option>
                                </Select>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1}  className={classes.grid}>
                            <Grid item sm={6}>
                                <Typography variant="subtitle1" gutterBottom className={classes.col} align="left">
                                    Insitute
                                </Typography>
                            </Grid>
                            <Grid item sm={6}>
                                <TextField id="standard-basic" label="Intsitute" fullWidth="true"/>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1}  className={classes.grid}>
                            <Grid item sm={6}>
                                <Typography variant="subtitle1" gutterBottom className={classes.col} align="left">
                                    Email
                                </Typography>
                            </Grid>
                            <Grid item sm={6}>
                                <TextField id="standard-basic" label="Email" fullWidth="true" />
                            </Grid>
                        </Grid>
                    </Grid>
                </form>


                <Button className={classes.btn}
                        variant="contained" color="primary"
                        style={{
                            marginTop: 10,
                        }}
                        onClick={() => {props.goProfile()}}
                >Back</Button>

                <Button className={classes.btn}
                    variant="contained" color="primary"
                    style={{
                        marginTop: 10,
                    }}
                    onClick={() => {props.saveProfile()}}
                >Save</Button>
            </main>
        </React.Fragment>
    );
});