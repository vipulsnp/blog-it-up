import React,{Component} from 'react'
import { withRouter } from 'react-router-dom';

                                            // Import All the Components Here
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CommentIcon from '@material-ui/icons/Comment';
import SpeakerNotesOffIcon from '@material-ui/icons/SpeakerNotesOff';
import TextField from '@material-ui/core/TextField';


import Comments from './ShowComments'

// Import Css here
import '../public/css/ShowBlog.css';

class ShowBlog extends Component{
    
    constructor(props){
        super(props);
        this.state={
            comment:"",
            commentVisible:[]
        }

    }

    static getDerivedStateFromProps(props,state)
    {
        return({
            commentVisible:props.commentVisible
        });
    }

                                            // Expand the Card to Show Full Blog
    handleExpandClick = (e)=>{
        this.props.updateVisible(e);
    }
                                            // Confirm deletion of Blog
    confirmDelete = (id)=>{
        var ans=prompt("Enter * delete * in CAPS to remove the blog !!");
        if(ans === "DELETE")
            {
                this.props.deleteBlog(id);
            }
        else
            alert("Deletion Aborted!");
    }

                                        // Edit Blog
    editBlog = (blogData) =>{
        this.props.editBlog(blogData);
    } 
                                        // Comment Input Change
    handleCommentChange = (e)=>{
        this.setState({
            comment:e.target.value
        });
    }
                                        // Show Comments on click
    handleShowComments = (e)=>{
        this.props.updateCommentVisible(e);
    }
                                        // Handle New Comment Submit
     handleCommentSubmit=(e,id,index)=>{

        e.preventDefault();
        if(this.props.user === undefined)
        {
            alert("Login to Add a Comment !!");
            this.setState({
                comment:""
            });
        }
        else
        {
            this.props.addComment(e,id,this.props.user.name,this.state.comment,index);
            setTimeout(() =>{
            var temp=this.state.commentVisible;
            temp[index] = true;
             this.setState({
                comment: "",
                commentVisible: temp })}, 2000);
        }

    }

    render(){

        const blogs = this.props.data.map((blogData,index) => {
            var stamp=blogData.author + " - " + blogData.date.slice(0,10);
            return (
                <div key={index}>
                    <Card className="root">
                                           {/* Title and the Author of the Blog */}
                        <CardHeader
                            title={blogData.title}
                            subheader={stamp}  
                        />
                                            {/* Image of the Blog */}
                        <CardMedia
                            component="img"
                            className="media"
                            image="https://image.shutterstock.com/image-photo/bloggingblog-concepts-ideas-white-worktable-260nw-1029506242.jpg"
                            title={blogData.title}
                        />

                                            {/* Short Blog */}
                        {this.props.visible[index] ? null : 
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {blogData.blog.slice(0, 200) + "..."}
                                </Typography>
                            </CardContent>
                        }

                        {/* Full Blog */}

                        <Collapse in={this.props.visible[index]} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography paragraph>
                                    {blogData.blog}
                                </Typography>
                            </CardContent>
                        </Collapse>

                                            {/* Card Actions */}
                {
                    this.props.canUpdate === true ?  
                            
                        <IconButton 
                            aria-label="edit"
                            className="color-icon-button"
                            onClick={()=>this.editBlog(blogData)}
                            title="Edit Blog"
                        >
                            <EditIcon />
                        </IconButton> : null 
                }

                {
                    this.props.canUpdate === true ? 
                        <IconButton 
                            aria-label="delete"
                            className="color-icon-button"
                            onClick={()=>this.confirmDelete(blogData._id)}
                            title="Delete Blog"
                        >
                                <DeleteForeverIcon />
                        </IconButton> : null
                }
                
                            <IconButton
                                className={this.props.visible[index] ? "expandOpen" + " color-icon-button" : "expand" + " color-icon-button"}
                                onClick={()=>this.handleExpandClick(index)}
                                title={this.props.visible[index] ? "Hide More" : "Show More"}
                                aria-expanded={this.props.visible[index]}
                                size="medium"
                                aria-label="show more"
                            >
                                <ExpandMoreIcon />
                          </IconButton>

                           {
                                this.state.commentVisible[index] === false &&
                            <IconButton 
                                className="color-icon-button"
                                onClick={()=>this.handleShowComments(index)}
                                title="Show Comments"
                                size="medium"
                                aria-label="Show Comments"
                            > 
                                <CommentIcon /> 
                            </IconButton>
                           }

                        {
                            this.state.commentVisible[index] === true &&
                            <IconButton
                                className="color-icon-button"
                                onClick={() => this.handleShowComments(index)}
                                title="Hide Comments"
                                size="medium"
                                aria-label="Hide Comments"
                            >
                                <SpeakerNotesOffIcon />
                            </IconButton>
                        }
                                                {/* Comments Of the Blog */}  
                                                {/* Display All the Comments */}
                        <Collapse in={this.state.commentVisible[index]} timeout="auto" unmountOnExit>
                            <Comments comments={blogData.comments} />
                        </Collapse> 
                                    <form onSubmit={(e) => this.handleCommentSubmit(e, blogData._id,index)}>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            id="comment"
                                            label="Add New Comment"
                                            name="comment"
                                            type="text"
                                            value={this.state.comment}
                                            onChange={this.handleCommentChange}
                                        />
                                    </form>
                    </Card>
                </div>
                )
        });

        return(
           blogs
        )
    }
}

export default withRouter(ShowBlog);