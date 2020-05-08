import React,{Component} from 'react'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import '../public/css/NewBlog.css'
import CircularProgress from '@material-ui/core/CircularProgress';

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

    handleBlogChange = (e) => {

        this.setState({
            blog: e.target.value
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
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="blog"
                        label="Write your Blog Here"
                        name="blog"
                        type="text"
                        multiline
                        rows={15}
                        value={this.state.blog}
                        onChange={this.handleBlogChange}
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