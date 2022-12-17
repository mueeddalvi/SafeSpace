import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import axios from '../axios'
import clsx from 'clsx';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import { green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

const useStyles2 = makeStyles(theme => ({

    success: {
        backgroundColor: green[600],
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
}))

const useStyles = (theme => ({
    paper: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        padding: theme.spacing(2),
        boxSizing: 'border-box',
        width: '68vw',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    button: {
        margin: theme.spacing(1),
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    root: {
        width: '100%',
    },
    formControl: {
        margin: theme.spacing(0),
        minWidth: '100%',
        maxWidth: '100vw',
    },
}));

const variantIcon = {
    success: CheckCircleIcon,
};

function MySnackbarContentWrapper(props) {
    const classes = useStyles2();
    const { className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];

    return (
        <SnackbarContent
            className={clsx(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
                    <Icon className={clsx(classes.icon, classes.iconVariant)} />
                    {message}
                </span>
            }
            action={[
                <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
                    <CloseIcon className={classes.icon} />
                </IconButton>,
            ]}
            {...other}
        />
    );
}


class AddNotice extends Component {

    state = {
        title: '',
        body: '',
        open: false,
    }

    onChange = (event) => {
        this.setState({
            ...this.state,
            [event.target.id]: event.target.value,
        })
    }

    submitHandler = () => {
        console.log(this.state);
        var d = new Date();
        let date = d.getUTCDate() + "-" + (d.getUTCMonth() + 1) + "-" + d.getUTCFullYear();
        let time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        console.log(date + " " + time);
        let notice = {
            title: this.state.title,
            body: this.state.body,
            date: date,
            time: time,
        }
        axios.post("/notices.json", notice)
            .then((response) => {
                console.log(response.data);
                this.setState({
                    ...this.state,
                    open: true,
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({
            ...this.state,
            open: false,
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Paper className={classes.paper}>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={this.state.open}
                        autoHideDuration={6000}
                        onClose={this.handleClose}
                    >
                        <MySnackbarContentWrapper
                            onClose={this.handleClose}
                            variant="success"
                            message="This is a success message!"
                        />
                    </Snackbar>
                    <br></br>
                    <Typography component="h2" variant="h4" align="center">
                        Add Notice
                    </Typography>
                    <br></br>
                    <hr></hr>
                    <form noValidate autoComplete="off">
                        <Grid container spacing={3} style={{ marginTop: "3vh" }}>
                            <Grid item xs={12}>
                                <TextField
                                    id="title"
                                    onChange={this.onChange}
                                    value={this.state.title}
                                    label="Notice Title"
                                    className={classes.textField}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="body"
                                    value={this.state.body}
                                    onChange={this.onChange}
                                    label="Notice Body"
                                    className={clsx(classes.textField, classes.dense)}
                                    variant="outlined"
                                    multiline
                                    fullWidth
                                    rows="15"
                                    rowsMax="15"
                                />
                            </Grid>
                            <Grid item xs={12} style={{ display: "flex", justifyContent: "flex-end" }}>
                                <Button onClick={this.submitHandler} size="large" variant="contained" color="primary">Submit</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </React.Fragment>
        )
    }
}


export default withStyles(useStyles)(AddNotice);