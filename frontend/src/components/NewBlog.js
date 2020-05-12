import React,{Component} from 'react'

// Import All the Components here

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// Import All the CSS here

import '../public/css/NewBlog.css'

export default class NewBlog extends Component{

    constructor(props) {
        super(props);

        this.state = {
            title: "",
            blog: "",
            success:false,
            error:false,
            loading:false
        }
    }

    componentDidMount(){
        let token=localStorage.getItem('jwt');
        if(!token){
            this.props.history.push('/error/forbidden');
        }
        else
        {
            fetch('/api/authtoken', {
                method:"POST",
                headers: { 
                    "Content-type":"application/json",
                    "authorization": "Bearer " + token 
                }
            }).then(res=>res.json().then(data=>{
                if(data.verifyStatus === false)
                {
                    this.props.history.push('/error/forbidden');
                    localStorage.removeItem('jwt');
                }
            }))
        }
    }
    handleBlogChange = (data)=>{
        this.setState({
            blog:data
        })
    }

    handleTitleChange = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    // Handle Submit

    handleSubmit = (e) =>{
        e.preventDefault();
        this.setState({
            loading:true
        });
        let token=localStorage.getItem('jwt');
        var base64Url = token.split('.')[1];
        var decodedValue = JSON.parse(window.atob(base64Url));

        if(this.state.blog === '')
        {
            alert("Blog Content is Required!");
            this.setState({
                loading:false
            })
            return;
        }

        let blog={
            title:this.state.title,
            blog:this.state.blog,
            author:decodedValue.name,
            author_id:decodedValue.email
        }

        fetch('api/new-blog', {
            method: 'POST',
            body: JSON.stringify(blog),
            headers: {
                'Accept': 'application / json',
                'Content-Type': 'application/json'
            },
        }).then(res =>{ 

            if (res.status === 200) 
            {
                res.json().then(data => {
                this.setState({
                    success: true,
                    loading:false
                })
                })
            } 
            else
                this.setState({
                    error: true,
                    loading:false
                })
            })
    }


    // Handle Create New Blog Click
    handleReturn = (e) =>{
        
        this.props.history.push('/');
    }



    render(){
        return(
            <div className="new-blog-container">
                                                {/* Title of the Blog */}
            <form className="new-blog" onSubmit={this.handleSubmit}>

                    <h1>Write your New Blog </h1>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    id="title"
                    label="Title"
                    name="title"
                    type="text"
                    value={this.state.title}
                    onChange={this.handleTitleChange}
                    autoFocus
                />
                                                                 {/* Blog Here */}

               
                <CKEditor
                    editor={ClassicEditor}
                    config={{ placeholder: "Write your Blog ..." }} 
                    id="blog-editor"
                   
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        this.handleBlogChange(data);
                            }}

                        />
                {
                    this.state.success === false && this.state.error === false && this.state.loading === false &&   
                        <Button
                            type="submit"
                            variant="contained"
                            className="submit"
                            style={{ color: "green", fontWeight: "600", backgroundColor: "gold" }}
                        >
                            Submit Blog
                        </Button>   
                }

                {

                    this.state.loading === true &&
                        <CircularProgress color="secondary" />
                        
                }

                {
                    this.state.success === true &&
                    <div>
                            <h3 
                                style={{ 
                                            color: "green", 
                                            fontWeight: "700", 
                                            backgroundColor: "rgb(193, 255, 100,0.6)",
                                            borderStyle:"solid",
                                            borderColor:"green",
                                            borderWidth:"0.13rem",
                                            borderRadius:"0.5rem"
                                        }}
                            
                            
                            > Blog Created Successfully </h3>


                            <Button
                                onClick={this.handleReturn}
                                variant="contained"
                                className="submit"
                                color="secondary"
                            >
                                Return to Dashboard
                        </Button>  
                    </div>
                }

                {
                    this.state.error === true &&
                    <div>
                        <h3 
                            style={{ 
                                        color: "red", 
                                        fontWeight: "700" ,
                                        backgroundColor:"rgb(0,0,0,0.6)",
                                        borderStyle: "solid",
                                        borderColor: "red",
                                        borderWidth: "0.13rem",
                                        borderRadius: "0.5rem"
                                    }}> 
                            Error Creating Blog !
                        </h3>
                        <Button
                            onClick={this.handleReturn}
                            variant="contained"
                            className="submit"
                            color="secondary"
                        >
                           Return To Dashboard
                    </Button>
                    </div>
                }
            </form>


            </div>
        )
    }
}