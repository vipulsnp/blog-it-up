import React,{Component} from 'react'
import firebase from "../firebase.js";

// Import All the Components here

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
// Import The css here
import '../public/css/Homepage.css'


export default class LoginForm extends Component{


    constructor(props){
        super(props);

        this.state={
            email:"",
            password:"",
            loading:false,
            success:undefined
        }
    }

    async componentDidMount() {
        var token = localStorage.getItem('jwt');

        if(token)
        {
            fetch('/api/authtoken',{
                method:"POST",
                headers: { authorization: "Bearer " + token }
            }).then(res=>res.json().then(data=>{
                
                if(data.verifyStatus === true)
                {
                    var base64Url = token.split('.')[1];
                    var decodedValue = JSON.parse(window.atob(base64Url));
                    var reqBody = {
                        email: decodedValue.email
                    }
                     fetch('/api/login-user', {
                        method: 'POST',
                        body: JSON.stringify(reqBody),
                        headers: {
                            'Accept': 'application / json',
                            'Content-Type': 'application/json'
                        },

                    }).then(res => res.json().then(user => {

                        this.props.handleSignIn(user.user);
                        this.props.routeParams.history.push("/user");
                    })
                    )
                } // if ends here
                else
                {
                        localStorage.removeItem('jwt');
                }      
            }))
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
        }
        const {email,password}=this.state;
        this.setState({
            email: "",
            password: "",
            loading:true
        });

                                            // Check the credentials Here
        firebase.auth().signInWithEmailAndPassword(email, password).then(res=>{

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

                    localStorage.setItem('jwt', data.accessToken);
                    this.setState({
                        loading: false
                    });
                                                // Set the Current User as The Logged in User
                    this.props.handleSignIn(data.user);                            
                                                // Redirect to the Dashboard page of the user 
                    this.props.routeParams.history.push("/user");

                })
                } 
        });

    }).catch(err=>{
        this.setState({
            success:false,
            loading:false
        });
    });

    }

    handleClick = (e) =>{
        this.props.switchLogin();
    }

    resetP = (e) =>{
        this.props.resetP();
    }

    handleClose = (e) =>{
        e.preventDefault();
        this.setState({
            success:undefined
        });
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
                {
                    this.state.loading === false ?
                
                    <Button
                        type="submit"
                        variant="contained"
                        className="submit"
                        style={{ color: "white", backgroundColor: "blue" }}
                    >
                        Sign In
                    </Button> 
                    :
                    <CircularProgress color="secondary" thickness='4.0' />
                }

                    <div className="login_grid">
                        <Typography>
                            <Link href="#" className="login_link" onClick={this.resetP}>
                                Forgot password?
                            </Link>
                        </Typography>
                        <Typography>
                            <Link href="#" className="login_link" onClick={this.handleClick}>
                                {"Don't have an account? Register Now"}
                            </Link>
                        </Typography>
                    </div>
                {
                    this.state.success === false &&
                    <h3
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
                        Incorrect Credentials !! &nbsp; &nbsp; &nbsp; 
                         
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
                </h3>
                }
                </form>
                

            </div>
        )           
    }
}