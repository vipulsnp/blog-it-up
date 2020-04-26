import React,{Component} from 'react';
import Homepage from './components/Homepage';
import NewBlog from './components/NewBlog';
import UserDash from './components/UserDash';
import EditBlog from './components/EditBlog';
import {Route,Switch} from 'react-router-dom';
import './App.css';

export default class App extends Component {

  constructor(props){
    super(props);
    this.state={
      activeUser:undefined,
      blogData:undefined
    }
  }

  handleAuth = (user)=>{
    this.setState({
      activeUser:user
    });
  }

  handleBlogData = (data)=>{
    this.setState({
      blogData:data
    });
  }
  render(){
      return (
        <div className="App">
          <Switch>
            <Route exact path="/" render={(routeParams)=><Homepage handleAuth={(user)=>this.handleAuth(user)} {...routeParams}/>} />
            <Route exact path="/new-blog" render={(routeParams)=><NewBlog user={this.state.activeUser} {...routeParams} />} />
            <Route exact path="/user" render={(routeParams) => <UserDash editBlog={(data)=>this.handleBlogData(data)} user={this.state.activeUser} {...routeParams} />} />
            <Route exact path="/edit-blog" render={(routeParams)=><EditBlog data={this.state.blogData} {...routeParams} />} />
          </Switch>
        </div>
); 
  }
}

