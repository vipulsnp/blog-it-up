let express     = require("express"),
    User        = require("../models/User"),
    Blog        = require("../models/Blog"),
    Comment     = require("../models/Comment"),
    path        = require("path"),
    jwt         = require("jsonwebtoken"),
    router      = express.Router();


 router.post("/blogger/:id",(req,res)=>{


    User.findOne({
        _id:req.params.id
    }).then(resp=>{
        res.json(resp);
    });

 });  

                                                    /* Verify Token Function */
function verifyToken(req, res, next) {

    const recdHeader = req.headers['authorization'];
    const receivedToken = recdHeader && recdHeader.split(' ')[1]
    jwt.verify(receivedToken, process.env.ACCESS_TOKEN_KEY, (err, user) => {

        if (err)
            return res.json({verifyStatus:false});    // Forbidden
        next();    // verified (Status : OK)
    });
}       

                                                // Add Blog To User

function addBlogToUser(user, blog) {
    User.updateOne(
        { _id: user },
        { $push: { blogs: blog } }
    ).then(res => {
        console.log("Blog Added to User id : ",user);
    });    
}

                                                // Create New Blog

router.post("/new-blog", (req, res) => {

    Blog.create({
        title: req.body.title,
        blog: req.body.blog,
        author: req.body.author,
        author_id: req.body.author_id,
        image: req.body.image
    }).then(blog => {
        console.log("Blog created!!");
        addBlogToUser(req.body.author_id, blog._id);
        res.json(blog);
    })
        .catch(error => {
            console.log(error);
            res.status(403).json(error);
        });
});

                                                    // Get the Blog Using Blog Id
router.post('/get-blog',(req,res)=>{

    Blog.findOne({
        _id:req.body.id
    }).then(blog=>{
        res.json(blog);
    });
})
                                                // Find and remove COmment using comment id
    function removeComment(id)
    {
        Comment.deleteOne({
            _id:id
        }).then(res=>{
            console.log("removed a comment",id);
        })
    }

                                                  // Find and Remove Blog

    function removeBlog(id){
                      
        Blog.find({
            _id:id
        }).then(blogData=>{
           // console.log(blogData[0].comments);
                                                // Remove all the comments in the blog 
            blogData[0].comments.map(comment=>{
                console.log(comment);
                removeComment(comment);

            });
                                                // Removing the Blog Id from the User Array
            User.updateOne(

                { _id : blogData[0].author_id },
                { $pull:{ blogs:id } }

            ).then(updateResp=>{
                                                    // Removing the Blog 
                Blog.deleteOne({
                    _id: id
                }).then(res=>{
                    console.log(res);
                });
            });
            
        })

    }

                                        // Add New comment
    router.post('/new-comment',(req,res)=>{


        Comment.create({
            author:req.body.user,
            description:req.body.comment
        }).then(commentResponse=>{

            console.log("Comment Creation : ", commentResponse);
            Blog.update(
                {
                    _id:req.body.id
                },
                {
                    $push: { comments: commentResponse._id}
                }
            ).then(response=>{

                console.log("Comment Update : ",response);
                res.json(commentResponse);
            })

        });
    });

                                                // Get Comment By ID
    router.post('/get-comment',(req,res)=>{

        Comment.findOne({
            _id:req.body.id
        }).then(resp=>{
            res.json(resp);
        });
    });


                                            //Add new User to Database
router.post("/create-user", (req, res) => {

    User.create({
        _id:req.body.email,
        name:req.body.name,
        username:req.body.username,
        email:req.body.email,
    })
        .then(user => {
            const user_token = { email: user.email, name: user.name, username: user.username };
            const accessToken = jwt.sign(user_token, process.env.ACCESS_TOKEN_KEY);                 // Create the token
            res.json({user:user,accessToken:accessToken});         // Respond the request for register New User
        })
        .catch(error => {
            res.status(403).json(error);
        });
});


                                    // Remove The User from The DataBase
router.post("/remove-user",(req,res)=>{

    // Remove All the Blogs of the User

    User.findOne({
        _id:req.body.id
    }).then(resp=>{
        resp.blogs.forEach(id => {
            removeBlog(id);
        });

        User.deleteOne({
            _id:req.body.id
        }).then(()=>{
            res.status(200).json();
        });
    })

});

                                            // Check Login Credentials

router.post("/login-user",(req,res)=>{

    User.findOne({
        _id:req.body.email,
    }).then(user=>{
        if(user == null)
            res.status(401).json(user);
        else
            {
                
            const user_token={email:user.email, name:user.name,username:user.username};
            const accessToken = jwt.sign(user_token, process.env.ACCESS_TOKEN_KEY);                 // Create the token
            res.status(200).json({ user: user, accessToken: accessToken});      
            
            }
    });
});

                                      

                                                // Get Blogs by User Id
router.post("/get-blogs",(req,res)=>{
    Blog.find({
        author_id:req.body.id
    }).then(blogs=>{
        res.json(blogs);
    })
});

                                                // Delete the blog and All the comments related to that Blog
router.post("/delete-blog",(req,res)=>{
    
    // delete the blog
    removeBlog(req.body.id);
    res.json({DeleteStatus:true});

});

                                            // Update Blog
router.post("/edit-blog",(req,res)=>{

                        // update blog

        Blog.update(
            {_id:req.body.id},
            {
                title:req.body.title,
                blog:req.body.blog  
            }
            ).then(resp=>{
                console.log(resp);
                res.json({updated:true});

            })

});


                                            // All Blogs
router.post("/all-blogs", (req, res) => {
    Blog.find({
    }).then(blogs => {
        res.json(blogs);
    })
})


                                            // Web Token Verification And Deletion


                                                    // Verify the Token Post Route
router.post('/authtoken', verifyToken, (req, res) => {
    res.json({ verifyStatus: true })
});

                                                        
module.exports = router;    
