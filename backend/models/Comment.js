//Comments Schema
"use strict";
let mongoose = require("mongoose");

let CommentSchema = new mongoose.Schema({
    description: { type: String, required: true },
    author: { type: String, required: true},
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Comment", CommentSchema);
