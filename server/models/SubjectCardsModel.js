const mongoose= require("mongoose");

const subCards= new mongoose.Schema({
    subject: {
        type: String,
        required: true,
    },
    fname:{
        type: String,
        required: true,
    },
});

const scards =mongoose.model("scards",subCards);
module.exports =scards;