import React, { Component } from 'react';


// Import All the required Components here 

import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm' 

// Import All the Css files here
import '../public/css/Homepage.css';

export default class Homepage extends Component
{

    constructor(props){
        super(props);
        this.state={
            animate:false,  
            login_visible:true,
            register_visible:false
        }
    }

    // Handle the click on Login User 
   
    switchLogin = () =>{
        
            this.setState({ 
                            login_visible: false,
                            register_visible: true
                        });
    }

    // Handle the Click on Regsiter User

    switchRegister = () =>{

        this.setState({
            register_visible: false,
            login_visible: true
        })
    }

    // handle Authorization
    handleAuth = (user) =>{
        this.props.handleAuth(user);
    }

                                                // Render the Components here 
    render(){
            return(
                
                <div className='homepage'>

                                                                
                        <LoginForm 
                            routeParams={this.props} 
                            switchLogin={this.switchLogin} 
                            handleSignIn={(user)=>this.handleAuth(user)} 
                            visible={this.state.login_visible} 
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