import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";


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

export default function Event() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <main className={classes.layout}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={8}>
                        <Typography variant="h5" align="left" gutterBottom className={classes.title}>
                            Upcoming Event: 2021 Summer School
                        </Typography>
                        <Typography variant="body1" align="left">
                        Third-party routing library
                        One common use case is to use the button to trigger navigation to a new page.
                        The ButtonBase component provides a property to handle this use case: component.
                        However for certain focus polyfills ButtonBase requires the DOM node of the provided component.
                        This is achieved by attaching a ref to the component and expecting that the component forwards this ref to the underlying DOM node.
                        Given that many of the interactive components rely on ButtonBase, you should be able to take advantage of it everywhere.
                        </Typography>

                    </Grid>

                    <Grid item container direction="column" xs={12} sm={4}>
                        <Grid container alignItems="center"
                              justify="center">
                            <img className={classes.pic} src={"https://pbs.twimg.com/media/DTwKMqbXcAEugcd.jpg"}>
                            </img>
                            <Button
                                variant="outlined"
                                style={{
                                    marginTop: 10,
                                }}
                                // onClick={() => {props.changePic()}}
                            >Location</Button>
                        </Grid>
                    </Grid>
                </Grid>

            </main>
        </React.Fragment>
    );
}