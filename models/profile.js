const mongoose = require('mongoose');
const user= require('./user');

const userProfileSchema = new mongoose.Schema({
    user_id: String,
    name: String,
    username: String,
    role:String,
    birthday:{
        type: Date,
        required:[true, 'Birthday is required']
    },
    age:{
        type:String
    },
    address:{
        type: String,
        required:[true, 'address is required']
    },
    town:{
        type: String,
        required: [true, 'Town is required'],
        trim: true
    },
    country:{
        type: String,
        required: [true, 'Location is required'],
        trim: true
    },
    phone:{
        type: String,
        trim:true
    },
    height:{
        type:String
    },
    existingillness:{
        type:String
    },
    profileimage:{
        type: Object,
        "avatar":{
            type:String
        },
        "cloundinary_id":{
            type:String
        }
    },
    verified:{
        type: Boolean,
        default: false
    },
    messages:[{
        sender: String,
        date:String,
        message:String,
        sender_id:String
    }]
});

const Profile = mongoose.model('Profile', userProfileSchema);

module.exports = Profile;