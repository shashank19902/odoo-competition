const mongoose=require('mongoose')

const materialSchema= new mongoose.Schema({
  mName: {
    type:String,
    required:true,
  },
  mUrl: {
    type:String,
    required:true,
  },
  mSubject: {
    type:String,
    required:true,
  },
  mType: {
    type:String,
    required:true,
  },
  mAuthor: {
    type:String,
    required:true,
  },
  Department: {
    type:String,
    required:true,
  },
  Semester: {
    type:Number,
    required:true,
  },
  References: {
    type:String,
  },
});

const MaterialSection= mongoose.model("MaterialSection",materialSchema);
module.exports= MaterialSection;