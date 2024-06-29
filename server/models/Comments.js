const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    comment:{
        type: String,
        required: true
    },
    commentedBy:{
        type: String,
        required: true
    },
    commentedOn:{
        type: Date,
        required: true
    },
    forumId:{
        type: String,
        required:true
    }
});

const CommentList = mongoose.model("comments", commentSchema);
module.exports = CommentList;
