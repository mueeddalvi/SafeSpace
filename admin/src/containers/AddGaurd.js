import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import axios from '../axios'

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
        width: 200,
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

class AddGuard extends Component {

    state = {
        name: '',
        contactNo: '',
        address: '',
        gateNo: '',
        shift: '',
        password: 'default',
    }

    onChange = (event) => {
        this.setState({
            ...this.state,
            [event.target.id]: event.target.value,
        })
    }

    submitHandler = () => {
        console.log(this.state);
        this.setState({
            ...this.state,
            gateNo: parseInt(this.state.gateNo),
        })
        let id = 'g' + this.state.gateNo;
        console.log(id);

        axios.get('/guards.json')
            .then((response) => {
                console.log(response.data);
                let guards = response.data;
                if (guards === null) {
                    id = id + '1';
                }
                else {
                    id = id + (Object.keys(guards).length + 1).toString();
                }
                console.log(id);

                axios.patch('/guards/' + id + '.json', this.state)
                    .then((response) => {
                        console.log(response);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            })
            .catch((error) => {
                console.log(error);
            })

    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Paper className={classes.paper}>
                    <br></br>
                    <Typography component="h2" variant="h4" align="center">
                        Add guard
                    </Typography>
                    <br></br>
                    <form className={classes.container} noValidate autoComplete="off">
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Name"
                                    id="name"
                                    value={this.state.name}
                                    onChange={this.onChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Contact Number"
                                    id="contactNo"
                                    value={this.state.contactNo}
                                    onChange={this.onChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    label="Address"
                                    id="address"
                                    value={this.state.address}
                                    onChange={this.onChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Gate Number"
                                    id="gateNo"
                                    value={this.state.gateNo}
                                    onChange={this.onChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Shift"
                                    id="shift"
                                    value={this.state.shift}
                                    onChange={this.onChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} align="right">
                                <Button size="large" variant="contained" color="primary" onClick={this.submitHandler}>Submit</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </React.Fragment>
        )
    }
}


export default withStyles(useStyles)(AddGuard);