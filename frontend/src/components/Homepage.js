import React, { Component } from 'react';


// Import All the required Components here 

import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm' 
import PasswordReset from '../components/resetPassword'

// Import All the Css files here
import '../public/css/Homepage.css';

export default class Homepage extends Component
{

    constructor(props){
        super(props);
        this.state={
            animate:false,  
            login_visible:true,
            register_visible:false,
            resetP:false
        }
    }

    // Handle the click on Login User 
   
    switchLogin = () =>{
        
            this.setState({ 
                            login_visible: false,
                            register_visible: true,
                            resetP:false
                        });
    }

    // Handle the Click on Regsiter User

    switchRegister = () =>{

        this.setState({
            register_visible: false,
            login_visible: true,
            resetP:false
        })
    }

    // handle Authorization
    handleAuth = (user) =>{
        this.props.handleAuth(user);
    }

    resetP = () =>{
        this.setState({
            register_visible: false,
            login_visible: false,
            resetP: true
        })
    }

                                                // Render the Components here 
    render(){
            return(
                
                <div className='homepage'>

                                                                
                        <LoginForm 
                            routeParams={this.props} 
                            switchLogin={this.switchLogin} 
                            handleSignIn={(user)=>this.handleAuth(user)} 
                            resetP={this.resetP}
                            visible={this.state.login_visible} 
                        />

                        < PasswordReset
                            routeParams={this.props}
                            visible={this.state.resetP}
                            switchRegister={this.switchRegister}  
                        />    

                        <RegisterForm 
                            routeParams={this.props} 
                            switchRegister={this.switchRegister} 
                            handleRegister={(user) => this.handleAuth(user)}
                            visible={this.state.register_visible} 
                        />
                                                        
                </div>
            )
    }
}