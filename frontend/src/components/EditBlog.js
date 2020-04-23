import React, { Component } from 'react'

// Import All the Components here

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

// Import All the CSS here

import '../public/css/NewBlog.css'

export default class EditBlog extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: "",
            blog: "",
            success: false,
            error: false
        }
    }

    async componentDidMount(){

        var reqBody={
            id:this.props.id
        }
        await fetch('api/get-blog', {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: {
                'Accept': 'application / json',
                'Content-Type': 'application/json'
            },
        }).then(res=>res.json().then(data=>{
            console.log("Fetched Blog : ",data);
            this.setState({
                title:data.title,
                blog:data.blog
            });
        }));
    }

    handleBlogChange = (e) => {
        this.setState({
            blog: e.target.value
        })
    }

    handleTitleChange = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    // Handle Submit

    handleSubmit = (e) => {
        e.preventDefault();

        let blog = {
            title: this.state.title,
            blog: this.state.blog,
            author: this.props.user.name,
            author_id: this.props.user._id
        }

        fetch('api/new-blog', {
            method: 'POST',
            body: JSON.stringify(blog),
            headers: {
                'Accept': 'application / json',
                'Content-Type': 'application/json'
            },
        }).then(res => {

            if (res.status === 200) {
                res.json().then(data => {
                    console.log(data);
                    this.setState({
                        success: true
                    })
                })
            }
            else
                this.setState({
                    error: true
                })
        })
    }


    // Handle Create New Blog Click
    handleReturn = (e) => {

        this.props.history.push('/user');
    }



    render() {
        return (
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
                        this.state.success === false && this.state.error === false &&
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
                        this.state.success === true &&
                        <div>
                            <h3
                                style={{
                                    color: "green",
                                    fontWeight: "700",
                                    backgroundColor: "rgb(193, 255, 100,0.6)",
                                    borderStyle: "solid",
                                    borderColor: "green",
                                    borderWidth: "0.13rem",
                                    borderRadius: "0.5rem"
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
                                    fontWeight: "700",
                                    backgroundColor: "rgb(0,0,0,0.6)",
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