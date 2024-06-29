const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
const registerSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter valid email address']
    },
    fullName: {
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
    semester: {
        type: Number,
        required:true,
        min: 1,
        max: 8
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
    verified: {
        type: Boolean,
        required: true,
        default: false
    },
    role: {
        type: String,
        default: "Student"
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

registerSchema.pre('save', async function (next) {
    console.log("Inside Pre of registerSchema");
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
});


registerSchema.methods.generateAuthToken = async function() {
    try {
        let token = await jwt.sign({_id: this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token: token});
        await this.save();
        return token;
    } catch (error) {
        console.log(error);
    }
}

const registerList = mongoose.model("users", registerSchema);
module.exports = registerList;
