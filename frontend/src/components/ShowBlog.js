import React,{Component} from 'react'

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
import AddCommentIcon from '@material-ui/icons/AddComment';
import TextField from '@material-ui/core/TextField';


import Comments from './ShowComments'

// Import Css here
import '../public/css/ShowBlog.css';

export default class ShowBlog extends Component{
    
    constructor(props){
        super(props);
        this.state={
            expanded:[],
            comment:""
        }
    }

    handleExpandClick = (e)=>{
        this.props.updateVisible(e);
    }

    confirmDelete = (id)=>{
        var ans=prompt("Enter * delete * in CAPS to remove the blog !!");
        if(ans === "DELETE")
            {
                this.props.deleteBlog(id);
            console.log("deleted!");
            }
        else
            alert("can't delete!");
    }

    handleCommentChange = (e)=>{
        this.setState({
            comment:e.target.value
        });
    }

    handleCommentSubmit = (e,id)=>{

        if(this.props.user === undefined)
        alert("Login first!!");
        else
        {
            this.props.addComment(e,id,this.props.user.name,this.state.comment);
            alert("Comment Submitted");
            this.setState({
                 comment:""
            });
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
                        >
                                <DeleteForeverIcon />
                        </IconButton> : null
                }
                
                            <IconButton
                            className={this.props.visible[index] ? "expandOpen" + " color-icon-button" : "expand" + " color-icon-button"}
                                onClick={()=>this.handleExpandClick(index)}
                                aria-expanded={this.props.visible[index]}
                                size="medium"
                                aria-label="show more"
                            >
                                <ExpandMoreIcon />
                          </IconButton>

                                                {/* Comments Of the Blog */}      
                            
                    </Card>

                    {/* Display All the Comments */}
                    {
                        !this.props.canUpdate ? 
                        <div>
                        <Comments comments={blogData.comments} />
                    <form onSubmit={(e) => this.handleCommentSubmit(e, blogData._id)}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            id="comment"
                            label="Comment"
                            name="comment"
                            type="text"
                            value={this.state.comment}
                            onChange={this.handleCommentChange}
                        />
                    </form>  
                    </div> : null } 
                </div>
                )
        });

        return(
           blogs
        )
    }
}