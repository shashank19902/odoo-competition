const mongoose = require('mongoose');

const UserOtpVerificationSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    },
});


const UserOtpVerification = mongoose.model('UserOtpVerification', UserOtpVerificationSchema);

module.exports = UserOtpVerification;