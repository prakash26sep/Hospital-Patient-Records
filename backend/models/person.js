const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema({
    fname: {
        type: String,
        trim: true,
        required: true
    },
    lname: {
        type: String,
        trim: true,
        required: true
    },
    gender: {
        type: String,
        trim: true,
        required: true
    },
    age:{
        type: Number,
        trim: true,
        required: true
    },
    email:{
        type: String,
        trim: true,
        required: true
    },
    about:{
        type: String,
        trim: true,
        required: true
    },
    weight:{
        type: Number,
        trim: true,
        required: true
    },
    height:{
        type: Number,
        trim: true,
        required: true
    }
});

const Person= mongoose.model("persondatamessages", personSchema);

module.exports= Person;