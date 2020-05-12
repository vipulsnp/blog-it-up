import React,{Component} from 'react'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import '../public/css/NewBlog.css'
import CircularProgress from '@material-ui/core/CircularProgress';

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default class EditBlog extends Component{


    constructor(props){
        super(props);
        this.state={
            title:"",
            blog:"",
            loading:false
        }
    }


    componentDidMount(){

        if(this.props.data === undefined){
            this.props.history.replace('/error/forbidden');

        }
        else
        this.setState({
            title:this.props.data.title,
            blog:this.props.data.blog
        });
    }


    handleTitleChange = (e) =>{

        this.setState({
            title:e.target.value
        });
    }

    handleBlogChange = (data) => {

        this.setState({
            blog: data
        });
    }

    handleSubmit = (e)=>{

        e.preventDefault();
        this.setState({
            loading:true
        });

        const reqBody={
            id:this.props.data._id,
            title:this.state.title,
            blog:this.state.blog
        }

        if(this.state.blog === '')
        {
            alert("Blog Content is Required !");
            this.setState({
                loading:false
            });
            return;
        }


        fetch('/api/edit-blog',{

            method:"POST",
            body:JSON.stringify(reqBody),
            headers:{
                'Accept':"application/json",
                "Content-Type":"application/json"
            }
        }).then(res=>res.json().then(data=>{
            this.setState({
                loading:false
            });
            this.props.history.replace("/user"); }));
    }


    render(){
        return(
            <div className="new-blog-container"> 
            
                <form className="new-blog" onSubmit={this.handleSubmit}>
                
                                            <h1>Edit your Blog </h1>
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
                        //config={{ placeholder: "Write your Blog ..." }}
                        onInit={editor => {
                                    editor.setData(this.state.blog);
                                }}
                        id="blog-editor"
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            this.handleBlogChange(data);
                        }}

                    />
                    {
                        this.state.loading === false ? 
                    
                    <Button
                        type="submit"
                        variant="contained"
                        className="submit"
                        style={{ color: "green", fontWeight: "600", backgroundColor: "gold" }}
                    >
                        Submit Blog
                    </Button> 
                    :
                        <CircularProgress color="secondary" thickness='4' />
                }
                </form>


            </div>
        )
    }
}