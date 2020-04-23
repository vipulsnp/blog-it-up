import React, {Component} from 'react'

// Import All the Required Components here


import Button from '@material-ui/core/Button';
import ShowBlog from '../components/ShowBlog';
// Import All the Css here

import '../public/css/UserDash.css'

export default class UserDash extends Component{


        // Constructor

        constructor(props){
            super(props);
            this.state={
                myBlog:false,
                allBlog:true,
                blogList:[],
                visible_array:[]
            }
        }


        componentDidMount(){
            this.fetchBlogs();
        }

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
                for(var i=0;i<size;i++)
                    {
                        new_visible.push(false);
                    }
                this.setState({
                    myBlog: false,
                    allBlog: true,
                    blogList: data,
                    visible_array:new_visible
                });
            }))
        }
    
    

    /* ------------------------------------------------------------------------------------------------------------------------------ */

                                                   // Show All the Blogs
    clickAllBlogs =(e)=>{
        e.preventDefault();
       this.fetchBlogs();
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
                for (var i = 0; i < size; i++) {
                    new_visible.push(false);
                }

                this.setState({
                    allBlog: false,
                    myBlog: true,
                    blogList:data,
                    visible_array:new_visible
                });
            }))



                                // Set the States here
       
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
        })
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
            console.log(data);
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


                                // Render The Component Here 
    render(){
        return(
            <div> This is the user dashboard!! 
                <Button
                    onClick={this.clickMyBlogs}
                    variant="contained"
                    className="submit"
                    style={{ color: "white", backgroundColor: "blue" }}
                >
                    My Blogs
                </Button>

                <Button
                    onClick={this.clickAllBlogs}
                    variant="contained"
                    className="submit"
                    style={{ color: "white", backgroundColor: "blue" }}
                >
                    All Blogs
                </Button>

                <Button
                    onClick={this.handleNewBlog}
                    variant="contained"
                    className="submit"
                    style={{ color: "white", backgroundColor: "blue" }}
                >
                    New Blog
                </Button>

                { this.state.myBlog ? 
                        <h1> My blogs</h1>: null 
                }

                { this.state.allBlog ?     
                    <h1> ALL Blogs </h1> : null 
                }
                <div className="blog-container">
                    <ShowBlog 
                        user={this.props.user}
                        canUpdate={this.state.myBlog} 
                        data={this.state.blogList} 
                        visible={this.state.visible_array} 
                        updateVisible={(index) => this.handleUpdateVisible(index)} 
                        addComment={(e,id,user,comment)=>this.addComment(e,id,user,comment)}
                        deleteBlog={(id)=>this.deleteBlog(id)}
                    />
                </div>
            </div>
        )
    }
} 


