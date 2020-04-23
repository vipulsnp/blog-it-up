import React,{Component} from 'react';
import Homepage from './components/Homepage';
import NewBlog from './components/NewBlog';
import UserDash from './components/UserDash';
import {Route,Switch} from 'react-router-dom';
import './App.css';

export default class App extends Component {

  constructor(props){
    super(props);
    this.state={
      activeUser:undefined
    }
  }

  handleAuth = (user)=>{
    this.setState({
      activeUser:user
    });
  }

  render(){
      return (
        <div className="App">
          <Switch>
            <Route exact path="/" render={(routeParams)=><Homepage handleAuth={(user)=>this.handleAuth(user)} {...routeParams}/>} />
            <Route exact path="/new-blog" render={(routeParams)=><NewBlog user={this.state.activeUser} {...routeParams} />} />
            <Route exact path="/user" render={(routeParams) => <UserDash user={this.state.activeUser} {...routeParams} />} />
          </Switch>
        </div>
); 
  }
}

