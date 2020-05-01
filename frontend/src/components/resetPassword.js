import React, { Component } from 'react'
import firebase from "../firebase"
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';

export default class PasswordReset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            validemail: "",
            loading:false
        }
    }

    handleEmailChange = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    handleSubmit = (e) => {

        this.setState({
            loading:true
        });

        const { email } = this.state;
        e.preventDefault();
        var auth = firebase.auth();
        var emailAddress = email;
        auth.sendPasswordResetEmail(emailAddress).then(res => {
            this.setState({ validemail: 'true',loading:false })
        }).catch(err => {
            this.setState({ validemail: 'false',loading:false })
        });

    }

    handleClose = (e) => {
        e.preventDefault();
        this.setState({
            validemail: undefined
        });
    }

    handleClick = (e) => {
        this.props.switchRegister();
    }
    /* Rendering the form of the Reset Password page here */

    render() {
        return (


                <div className={this.props.visible ? "log-reg" : "hide"}>

                <form className="form" onSubmit={this.handleSubmit}>
                                                            {/* Email Address input field */}
                                            <h1> Reset Password </h1> 
                    <Typography style={{ textAlign: "center" }}>
                        Enter the registered email address. You will receive the Password reset link on that Email.
                    </Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        type="email"
                        value={this.state.email}
                        onChange={this.handleEmailChange}
                        autoFocus
                    />

                {
                    this.state.loading === false ? 
                        <Button
                        type="submit"
                        color="secondary"
                        fullWidth
                        size="large"
                        variant="contained"
                        className="register"
                    >
                        Submit
                    </Button>
                    :
                    <CircularProgress color="secondary" thickness='4.0' /> 
                }
                    <div className="login_grid">
                        <Typography>
                            <Link href="#" className="login_link" onClick={this.handleClick}>
                                {"Back to Login "}
                            </Link>
                        </Typography>
                    </div>

                    {
                        this.state.validemail === 'true' && 
                        <h4
                            style={{
                                color: "green",
                                fontWeight: "700",
                                backgroundColor: "rgb(193, 255, 100,0.6)",
                                borderStyle: "solid",
                                borderColor: "green",
                                borderWidth: "0.13rem",
                                borderRadius: "0.5rem"
                            }}
                        > 
                            Email sent to the registered email. 
                        </h4>
                    }
                    {
                        this.state.validemail === 'false' &&

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
                            Please enter a valid registered email id  &nbsp; &nbsp; &nbsp; 
                             
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
