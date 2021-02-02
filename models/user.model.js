const mongoose = require('mongoose')
const passportLocalMongoose = require("passport-local-mongoose");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
// const dateFormat = require("dateformat");

var options = {
    errorMessages: {
        MissingPasswordError: 'No password was given',
        AttemptTooSoonError: 'Account is currently locked. Try again later',
        TooManyAttemptsError: 'Account locked due to too many failed login attempts',
        NoSaltValueStoredError: 'Authentication not possible. No salt value stored',
        IncorrectPasswordError: 'Password or username are incorrect',
        IncorrectUsernameError: 'Password or username are incorrect',
        MissingUsernameError: 'No username was given',
        UserExistsError: 'A user with the given username is already registered'
    }
};

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        // required: true,
        min: 3,
        max: 255
    },
    username: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    password: {
        type: String,
        // required: true,
        min: 3,
        max: 255
    },
    role:{
        type:String,
        required:true
    }
},{timestamps: true})

userSchema.plugin(passportLocalMongoose, options);

const User = mongoose.model('User', userSchema);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new localStrategy({username:'username',password:'password'},User.authenticate()));
passport.authenticate('local', {failureFlash: 'Invalid username or password.'})
passport.authenticate('local', {successFlash: 'Welcome!'})


module.exports = User