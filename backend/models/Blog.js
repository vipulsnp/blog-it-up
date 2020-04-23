//Blog Schema
"use strict";
let mongoose = require("mongoose");
let BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    blog: { type: String, required: true },
    image: {type: String,required:false},
    author:{ type:String, required:true},
    author_id: { type: String, required: true },
    date: { type: Date, default: Date.now },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments"
    }]
});

module.exports = mongoose.model("Blog", BlogSchema);
