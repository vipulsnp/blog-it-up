import React, { Component } from 'react'


// Import All the Components here

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

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
            password2:""
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

    handlePassword2Change = (e) => {
        this.setState({
            password2: e.target.value
        })
    }


    handleSubmit = (e) => {

        e.preventDefault();
       
        let newUser = {
            "name": this.state.name,
            "username": this.state.username,
            "email":this.state.email,
            "password":this.state.password
        }

        this.setState({
            name: "",
            email: "",
            password: "",
            password2: "",
            username:""
        });


        fetch('http://localhost:5000/api/create-user', {
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: {
                'Accept': 'application / json',
                'Content-Type': 'application/json'
            },
        }).then(res=>{

            if(res.status === 403)
                alert("Alredy exists!!");
            else
            {
                res.json().then(data => {
                    console.log(data);
                    alert("Created the User"); 
                                                // Set the Current User as The Logged in User
                    this.props.handleRegister(data);
                                                // Redirect to the Dashboard page of the user 
                    this.props.routeParams.history.push("/user");
                })
            }
        });

    }

    handleClick = (e) => {
        this.props.switchRegister();
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
                                                            {/*Confirm Password */}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        name="password2"
                        label="Confirm Password"
                        type="password"
                        id="password2"
                        value={this.state.password2}
                        onChange={this.handlePassword2Change}
                    />

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
                </form>

            </div>

        ) 
    }
}