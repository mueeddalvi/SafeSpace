import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from '../axios'
import { withRouter } from 'react-router-dom'

const useStyles = (theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


class Login extends Component {

    state = {
        email:'',
        password:'',
        adminEmail: '',
        adminPassword:'',
    }

    loginHandler = () => {
        console.log(this.state);
        if((this.state.adminEmail===this.state.email)&&(this.state.password===this.state.adminPassword)){
            console.log("Equal");
            this.props.history.push(this.props.match.path+'/dashboard');
        }
        else{
            console.log("Not equal");
        }
    }

    onChange =  (event) => {
        this.setState({
            ...this.state,
           [ event.target.id]: event.target.value,
        })
    }

    componentDidMount(){
        axios.get('/admin.json')
        .then((response) => {
            console.log(response.data);
            this.setState({
                ...this.state,
                adminEmail:response.data.email,
                adminPassword:response.data.password,
            })
        })
        .catch((error)=>{
            console.log(error);
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={this.onChange}
                            value={this.state.email}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={this.onChange}
                            value={this.state.password}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.loginHandler}
                        >
                            Sign In
                  </Button>
                    </form>
                </div>
            </Container>
        );
    }
}

export default withRouter(withStyles(useStyles)(Login));