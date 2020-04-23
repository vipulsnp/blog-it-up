import React,{Component} from 'react'

// Import All the Components here

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

// Import The css here
import '../public/css/Homepage.css'


export default class LoginForm extends Component{


    constructor(props){
        super(props);

        this.state={
            email:"",
            password:""
        }
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

    handleSubmit = (e) =>{

        e.preventDefault();
        // Login and Check on Submit 

        let user = {
            "email": this.state.email,
            "password": this.state.password
        }

        this.setState({
            email: "",
            password: ""
        })

                                            // Check the credentials Here
        fetch('api/login-user', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Accept': 'application / json',
                'Content-Type': 'application/json'
            },
        }).then(res=>{
            if(res.status === 200)
                {
                res.json().then(data => {
                                                // Set the Current User as The Logged in User
                    this.props.handleSignIn(data);                            
                                                // Redirect to the Dashboard page of the user 
                    this.props.routeParams.history.push("/user");

                })
                    alert("Access granted!");
                }
            else
                alert("Not found !! Denied Access ");   
        })

    }

    handleClick = (e) =>{
        this.props.switchLogin();
    }

    
    render(){

    return(
        <div className={this.props.visible ? "log-reg" : "hide"}>

                <form className="form" onSubmit={this.handleSubmit}>
                                                            {/* Email Address input field */}
                                            <h1> Login </h1> 
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
                        autoFocus
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
                
                    <Button
                        type="submit"
                        variant="contained"
                        className="submit"
                        style={{ color: "white", backgroundColor: "blue" }}
                    >
                        Sign In
                    </Button>
                        

                    <div className="login_grid">
                        <Typography>
                            <Link href="/passwordreset" className="login_link">
                                Forgot password?
                            </Link>
                        </Typography>
                        <Typography>
                            <Link href="#" className="login_link" onClick={this.handleClick}>
                                {"Don't have an account? Register Now"}
                            </Link>
                        </Typography>
                    </div>
                </form>

            </div>
        )           
    }
}