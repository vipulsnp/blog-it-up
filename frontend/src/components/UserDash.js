import React, {Component} from 'react'

// Import All the Required Components here


import CloseIcon from '@material-ui/icons/Close';
import ShowBlog from '../components/ShowBlog';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

// Import All the Css here

import '../public/css/UserDash.css'
import defaultProfile from '../public/images/profile-default.png'

export default class UserDash extends Component{


        // Constructor

        constructor(props){
            super(props);
            this.state={
                myBlog:false,
                allBlog:true,
                blogList:[],
                visible_array:[],
                comments_visible:[],
                anchorEl:null,
                accountAnchor:null
            }
        }


        componentDidMount(){
            this.fetchBlogs();
        }

     handleClick = (e) => {
        this.setState({
            anchorEl:e.currentTarget});
    };

    handleAccountClick = (e) => {
        this.setState({
            accountAnchor: e.currentTarget
        });
    };

    handleLogout = (e) =>{
        e.preventDefault();
        alert("logout clicked!");
        this.handleClose();
    }

     handleClose = () => {
         this.setState({
             anchorEl: null,
             accountAnchor:null
         });
    };
                                                /* Fetch all the Blogs */
        fetchBlogs(){
             fetch('/api/all-blogs', {
                method: 'POST',
                headers: {
                    'Accept': 'application / json',
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json().then(data => {

                var size=data.length;
                var new_visible=[];
                var new_comments_visible = [];
                for(var i=0;i<size;i++)
                    {
                        new_visible.push(false);
                        new_comments_visible.push(false);
                    }
                this.setState({
                    myBlog: false,
                    allBlog: true,
                    blogList: data,
                    visible_array: new_visible,
                    comments_visible: new_comments_visible
                });
            }))
        }
    
    

    /* ------------------------------------------------------------------------------------------------------------------------------ */

                                                   // Show All the Blogs
    clickAllBlogs =(e)=>{
        e.persist();
       this.fetchBlogs();
        this.handleClose();
    }   

    /* ------------------------------------------------------------------------------------------------------------------------------ */
                                                    // Show User Blogs
    
    clickMyBlogs = () => {

       let reqBody={
           id:this.props.user._id
       }

       fetch('/api/get-blogs', {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: {
                'Accept': 'application / json',
                'Content-Type': 'application/json'
            }}).then(res=>res.json().then(data=>{

                var size = data.length;
                var new_visible = [];
                var new_comments_visible=[];
               
                for (var i = 0; i < size; i++) {
                    new_visible.push(false);
                    new_comments_visible.push(false);
                }

                this.setState({
                    allBlog: false,
                    myBlog: true,
                    blogList:data,
                    visible_array:new_visible,
                    comments_visible: new_comments_visible
                });
            }));

            this.handleClose();

    }   


   handleNewBlog = (e) =>{
        e.preventDefault();
        this.props.history.push('/new-blog');
    }

    deleteBlog = (id)=>{
        var reqBody={
            id:id
        }
        fetch('/api/delete-blog', {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: {
                'Accept': 'application / json',
                'Content-Type': 'application/json'
            }
        }).then(res=>{
            console.log(res);
            this.clickMyBlogs();
            alert("Blog Deleted Successfully !!!")
        });
    }


    /*  Add Comment */

    addComment = (e,id,user,comment) =>{

        e.preventDefault();
        var comment_body={
            id:id,
            user:user,
            comment:comment
        }
        fetch('/api/new-comment',{

            method:"POST",
            body:JSON.stringify(comment_body),
            headers: {
                'Accept': 'application / json',
                'Content-Type': 'application/json'
            },
        }).then(res=>res.json().then(data=>{
            if(this.state.myBlog === true)
            this.clickMyBlogs(e);
            else
            this.clickAllBlogs(e);
        }));
    } 

 /* -------------------------------------------------------------------------------------------------------------- */
                                // Update the Visible Array when clicked 
    handleUpdateVisible=(index)=>{
        var new_visible=[];
        for(var i=0;i<this.state.visible_array.length;i++)
        {
            if(i === index)
                {
                    new_visible.push(!this.state.visible_array[i]);                    
                }
            else
                new_visible.push(this.state.visible_array[i]);
        }
        this.setState({
            visible_array:new_visible
        })

    }

    updateCommentsVisible = (index)=>{
        var new_array=[];
        for(var i=0;i<this.state.comments_visible.length;i++)
        {
            if(i===index)
            {
                new_array.push(!this.state.comments_visible[i]);
            }
            else
            new_array.push(this.state.comments_visible[i]);
        }

        this.setState({
            comments_visible:new_array
        })
    }

    editBlog =(data)=>{
        this.props.editBlog(data);
        setTimeout(() => {
            this.props.history.push("/edit-blog");
        }, 1000);

    }

                                // Render The Component Here 
    render(){
        return(
            <div> 
                <AppBar position="fixed" className="app-bar">
                    <Toolbar>


                        <Typography className="title" variant="h6" noWrap>
                           Blog-It-Up
                        </Typography>

                        <div style={{ textAlign: "right",width:"100%" }}>

                                                            {/* User Profile and Logout Option On Click */}
                                    
                        {
                                this.props.user !== undefined ?
                            Boolean(this.state.accountAnchor) ? 

                                <IconButton
                                    aria-controls="account-menu"
                                    className="menuButton color-icon-button"
                                    aria-haspopup="true"
                                    onClick={this.handleClose}
                                >
                                    <CloseIcon />
                                </IconButton>
                            :
                                <IconButton
                                    aria-controls="account-menu"
                                    className="menuButton color-icon-button"
                                    aria-haspopup="false"
                                    onClick={this.handleAccountClick}
                                >
                                    <AccountCircleIcon />
                                </IconButton> : null
                        }

                        { this.props.user !== undefined &&
                            <Menu
                                id="account-menu"
                                anchorEl={this.state.accountAnchor}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}
                                keepMounted
                                getContentAnchorEl={null}
                                open={Boolean(this.state.accountAnchor)}
                                onClose={this.handleClose}
                                TransitionComponent={Fade}
                            >
                                <MenuItem disabled>
                                    <Avatar alt="profile" src={defaultProfile} />
                                </MenuItem>
                                <MenuItem disabled>{this.props.user.name}</MenuItem>
                                <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                            </Menu>
                        }



                                                            {/* Menu list */}
                            {
                                Boolean(this.state.anchorEl) ?

                                    <IconButton 
                                        aria-controls="fade-menu" 
                                        className="menuButton color-icon-button" 
                                        aria-haspopup="true"
                                        onClick={this.handleClose}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                    :

                                    <IconButton 
                                        aria-controls="fade-menu" 
                                        className="menuButton color-icon-button" 
                                        aria-haspopup="false" 
                                        onClick={this.handleClick}
                                    >
                                        <MenuIcon />
                                    </IconButton>
                            }
                            <Menu
                                id="fade-menu"
                                anchorEl={this.state.anchorEl}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}
                                keepMounted
                                getContentAnchorEl={null}
                                open={Boolean(this.state.anchorEl)}
                                onClose={this.handleClose}
                                TransitionComponent={Fade}
                            >
                                <MenuItem onClick={this.clickMyBlogs}>My Blogs</MenuItem>
                                <MenuItem onClick={this.clickAllBlogs}>All Blogs</MenuItem>
                                <MenuItem onClick={this.handleNewBlog}>New Blog</MenuItem>
                            </Menu>
                                                    {/* Menu List Ends */}
                        </div>
                    </Toolbar>
                </AppBar>
                <Toolbar />
                                                    {/* App Bar Ends here */}
                <div className="blog-container">
                    {this.state.myBlog ?
                        <h1> My Blogs</h1> : null
                    }

                    {this.state.allBlog ?
                        <h1> All Blogs </h1> : null
                    }
                    <ShowBlog 
                        user={this.props.user}
                        canUpdate={this.state.myBlog} 
                        data={this.state.blogList} 
                        visible={this.state.visible_array} 
                        updateVisible={(index) => this.handleUpdateVisible(index)} 
                        addComment={(e,id,user,comment)=>this.addComment(e,id,user,comment)}
                        commentVisible={this.state.comments_visible}
                        updateCommentVisible={(index)=>this.updateCommentsVisible(index)}
                        deleteBlog={(id)=>this.deleteBlog(id)}
                        editBlog={(data)=>{this.editBlog(data)}}
                    />
                </div>
            </div>
        )
    }
} 


