const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  projectName: {
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
  authorid: {
    type: String,
    required: true,
  },
  technology: {
    type: String,
    required: true,
  },
});

const ProjectList = mongoose.model("ProjectList", projectSchema);
module.exports = ProjectList;
