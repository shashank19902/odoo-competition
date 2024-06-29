const mongoose = require("mongoose");

const newProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    projecturl: {
        type: String,
        required: true,
    },
    // uploadedBy: {
    //     type: String,
    //     required: true,
    // },
    Date: {
        type: Date,
        required: true,
    },

});

const ProjectRequest = mongoose.model("pendingProjectRequests", newProjectSchema);
module.exports = ProjectRequest;
