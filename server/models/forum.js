const mongoose = require("mongoose");

const forumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: String,
        required: true,
        default: 'incomplete'
    },
    uploadedBy: {
        type: String,
        required: true
    },
    uploadedById: {
        type: String,
        required: true
    }
});

const ForumList = mongoose.model("forums", forumSchema);
module.exports = ForumList;
