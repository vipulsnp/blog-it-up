//User Schema
"use strict";
let mongoose = require("mongoose");
let userSchema = new mongoose.Schema({
    _id:{type:String,required:true,unique:true},
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password:{type:String,required:true},
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blogs"
    }]
});

module.exports = mongoose.model("user", userSchema);
