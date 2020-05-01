import React, { Component } from 'react'
import firebase from "../firebase.js"


// Import All the Components here

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';

// Import The css here
import '../public/css/Homepage.css'



export default class RegisterForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name:"",
            username:"",
            email: "",
            password: "",
            success: undefined
        }
    }



    handleNameChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    handleUserNameChange = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    handleEmailChange = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    handlePasswordChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }


    handleSubmit = (e) => {

        e.preventDefault();
       
        let newUser = {
            "name": this.state.name,
            "username": this.state.username,
            "email":this.state.email
        }

        const {email,password}=this.state;

        this.setState({
            name: "",
            username: "",
            email: "",
            password: ""
        });


        firebase.auth().createUserWithEmailAndPassword(email, password).then(res=>{

            fetch('http://localhost:5000/api/create-user', {
                method: 'POST',
                body: JSON.stringify(newUser),
                headers: {
                    'Accept': 'application / json',
                    'Content-Type': 'application/json'
                },
            }).then(res => {

                    res.json().then(data => {
                        // Set the Current User as The Logged in User
                        this.props.handleRegister(data);
                        // Redirect to the Dashboard page of the user 
                        this.props.routeParams.history.push("/user");
                    })
                
            });

        }).catch(err=>{
            this.setState({
                success:false
            });
        });
        
    }

    handleClick = (e) => {
        this.props.switchRegister();
    }

    handleClose = (e) => {
        e.preventDefault();
        this.setState({
            success: undefined
        });
    }


    render() {

        return (
            <div className={this.props.visible ? "log-reg" : "hide" }>
                <form className="form" onSubmit={this.handleSubmit}>
                    <h1> Register </h1>
                                                        {/* Name input field */}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        id="name"
                        label="Full Name"
                        name="name"
                        type="text"
                        value={this.state.name}
                        onChange={this.handleNameChange}
                        autoFocus
                    />
                                                         {/* UserName input field */}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        id="username"
                        label="User Name"
                        name="username"
                        type="text"
                        value={this.state.userName}
                        onChange={this.handleUserNameChange}
                    />
                                                         {/* Email Address input field */}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        id="email"
                        label="Email Address"
                        name="email"
                        type="email"
                        value={this.state.email}
                        onChange={this.handleEmailChange}   
                    />
                                                             {/* Password input field */}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                    />
                                                        {/* Submit Button  */}
                    <Button
                        type="submit"
                        variant="contained"
                        className="submit"
                        style={{ color: "white", backgroundColor: "blue" }}
                    >
                        Register
                    </Button>

                        <Typography>
                            <Link href="#" className="login_link" onClick={this.handleClick}>
                                {"Already have an account?Sign In"}
                            </Link>
                        </Typography>

                        {
                    this.state.success === false &&
                    <h4
                        style={{
                            color: "red",
                            fontWeight: "700",
                            backgroundColor: "rgb(0,0,0,0.6)",
                            borderStyle: "solid",
                            borderColor: "red",
                            borderWidth: "0.13rem",
                            borderRadius: "0.5rem"
                        }}
                    >
                        User with given Email already exists. &nbsp; &nbsp; &nbsp; 
                         
                         <IconButton
                            aria-controls="close-error"
                            style=  {{
                                        color:"inherit"
                                    }}
                            aria-haspopup="false"
                            onClick={this.handleClose}
                        >
                            <CancelIcon /> 
                        </IconButton>
                </h4>
                }


                </form>

            </div>

        ) 
    }
}