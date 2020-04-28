import React,{Component} from 'react'
import { withRouter } from 'react-router-dom'

import ShowBlog from './ShowBlog'
import Button from '@material-ui/core/Button';
import '../public/css/UserDash.css'

class SearchResult extends Component{


    constructor(props)
    {
        super(props);
        this.state={
            found:true,
            blogList:[],
            visible_array:[],
            comments_visible:[]
        }
    }

    componentDidMount()
    {

        fetch(`/api/blogger/${this.props.match.params.search}`,{

            method:"POST",
            headers:{
                "Content-Type":"application/json"
            }

        }).then(res=>res.json().then(data=>{

            if(data===null)
            {
                this.setState({
                        found:false
                });
            }

            else
            {
                const reqBody={
                    id:data._id
                }
                fetch('/api/get-blogs', {
                    method: 'POST',
                    body: JSON.stringify(reqBody),
                    headers: {
                        'Accept': 'application / json',
                        'Content-Type': 'application/json'
                    }
                }).then(res => res.json().then(blogData => {

                    var size = blogData.length;
                    var new_visible = [];
                    var new_comments_visible = [];

                    for (var i = 0; i < size; i++) {
                        new_visible.push(false);
                        new_comments_visible.push(false);
                    }

                    this.setState({
                        blogList: blogData,
                        visible_array: new_visible,
                        comments_visible: new_comments_visible
                    });
                }));
                
            }
            
        }));

    }



    updateCommentsVisible = (index) => {
        var new_array = [];
        for (var i = 0; i < this.state.comments_visible.length; i++) {
            if (i === index) {
                new_array.push(!this.state.comments_visible[i]);
            }
            else
                new_array.push(this.state.comments_visible[i]);
        }

        this.setState({
            comments_visible: new_array
        })
    }

    handleUpdateVisible = (index) => {
        var new_visible = [];
        for (var i = 0; i < this.state.visible_array.length; i++) {
            if (i === index) {
                new_visible.push(!this.state.visible_array[i]);
            }
            else
                new_visible.push(this.state.visible_array[i]);
        }
        this.setState({
            visible_array: new_visible
        })

    }

    closeTab = (e) =>{
        window.close();
    }

    render(){

        return(
            <div>
                {
                    this.state.found === false &&
                    <div>
                        <h2 style={{ color: "red" }}> User <em style={{color:"blue"}}> {this.props.match.params.search} </em> Not Found !!</h2>
                        <Button variant="contained" color="secondary" onClick={this.closeTab}> Close Tab </Button> </div>
                }    

                {
                    this.state.found === true &&
                    <div className="blog-container">
                        <h2 style={{ color: "green" }}>User : <em style={{ color: "blue" }}> {this.props.match.params.search} </em> </h2>
                    <h2 style={{color:"green"}}> Blogs </h2>
                    <ShowBlog
                        user={undefined}
                        canUpdate={false}
                        data={this.state.blogList}
                        visible={this.state.visible_array}
                        updateVisible={(index) => this.handleUpdateVisible(index)}
                        commentVisible={this.state.comments_visible}
                        updateCommentVisible={(index) => this.updateCommentsVisible(index)}
                    />
                    </div>

                }

            </div>
        )
    }
}

export default withRouter(SearchResult);