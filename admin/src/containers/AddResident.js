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

class AddUser extends Component {

    state = {
        name: '',
        contactNo: '',
        email: '',
        building: '',
        floor: '',
        flat: '',
        password:'default',
    }

    onChange = (event) => {
        this.setState({
            ...this.state,
            [event.target.id]: event.target.value,
        })
    }

    submitHandler = () => {
        console.log(this.state);
        let state2 = {
            ...this.state,
            floor: parseInt(this.state.floor),
            flat: parseInt(this.state.flat),
        }
        let id = 'r'+this.state.building + this.state.floor + this.state.flat;
        console.log(id);
        let family = {};
        axios.get('/structure/' + this.state.building + '/' + this.state.floor + '/' + this.state.flat + '.json')
            .then((response) => {
                family = response.data;
                console.log(family);
                if (family === null) {
                    id = id + '1';
                }
                else {
                    id = id + (Object.keys(family).length+1).toString();
                }
                axios.patch('/residents/'+id+'/'+'.json',state2);
                axios.patch('/structure/' + this.state.building + '/' + (this.state.floor) + '/' + (this.state.flat) + '.json',{[id]:this.state.password})
                    .then((response) => {
                        console.log(response.data)
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                console.log(id);
            })


    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Paper className={classes.paper}>
                    <br></br>
                    <Typography component="h2" variant="h4" align="center">
                        Add Resident
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
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Email"
                                    id="email"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Building name"
                                    id="building"
                                    value={this.state.building}
                                    onChange={this.onChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Floor Number"
                                    id="floor"
                                    value={this.state.floor}
                                    onChange={this.onChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Flat Number"
                                    id="flat"
                                    value={this.state.flat}
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


export default withStyles(useStyles)(AddUser);