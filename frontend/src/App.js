import React,{Component} from 'react';
import Homepage from './components/Homepage';
import NewBlog from './components/NewBlog';
import UserDash from './components/UserDash';
import EditBlog from './components/EditBlog';
import Footer from './components/Footer'; 
import {Route,Switch, withRouter, Router} from 'react-router-dom';
import './App.css';
import SearchResult from './components/SearchResult';

import Forbidden from './components/error/403'
import NotFound from './components/error/404'
 class App extends Component {

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

  logout = () =>{
    this.setState({
      activeUser:undefined
    });
    localStorage.removeItem("jwt");
    this.props.history.replace('/');
  }

  handleBlogData = (data)=>{
    this.setState({
      blogData:data
    });
  }


   async componentDidMount() {
     var token = localStorage.getItem('jwt');

     if (token) {
       fetch('/api/authtoken', {
         method: "POST",
         headers: { authorization: "Bearer " + token }
       }).then(res => res.json().then(data => {

         if (data.verifyStatus === true) {
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

            this.setState({
              activeUser:user.user
            })
            if(this.props.location.pathname === '/')
             this.props.history.replace('/user');
           })
           )
         } // if ends here
         else {
           localStorage.removeItem('jwt');
         }
       }))
     }

   }



  render(){
      return (
        <div className="App">
          <Switch>
            <Route exact path="/" render={(routeParams)=><Homepage handleAuth={(user)=>this.handleAuth(user)} {...routeParams}/>} />
            <Route exact path="/new-blog" render={(routeParams)=><NewBlog {...routeParams} />} />
            <Route exact path="/blogger/:search" render={(routeParams)=><SearchResult {...routeParams} /> } />
            <Route exact path="/user" render={(routeParams) => <UserDash logout={this.logout} editBlog={(data)=>this.handleBlogData(data)} user={this.state.activeUser} {...routeParams} />} />
            <Route exact path="/edit-blog" render={(routeParams)=><EditBlog data={this.state.blogData} {...routeParams} />} />


                                                    {/* Error Pages */}
            <Route exact path='/error/forbidden' render={(routeParams)=><Forbidden {...routeParams} />} />
            <Route exact path='*' render={(routeParams) => <NotFound {...routeParams} />} />

          </Switch>
          <Footer />
        </div>
); 
  }
}

export default withRouter(App);