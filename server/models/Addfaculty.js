const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

const validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
const addFacultySchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter valid email address']
    },
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    shortName: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    college: {
        type: String,
        required:true,
    },
    role: {
        type: String,
        required:true
    },
    mobileNumber: {
        type: Number,
        required:true
    },
    password: {
        type: String,
        required: true,
    },
    cpassword: {
        type: String,
        required: true,
    },
    expertise: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    linkedIn: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            }
        }
    ]
});

addFacultySchema.pre('save', async function (next) {
    console.log("Inside Pre of facultySchema");
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
});

addFacultySchema.methods.generateAuthToken = async function() {
    try {
        let token = await jwt.sign({_id: this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token: token});
        await this.save();
        return token;
    } catch (error) {
        console.log(error);
    }
}

const facultyList = mongoose.model("faculties", addFacultySchema);
module.exports = facultyList;
