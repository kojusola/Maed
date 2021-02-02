// require('dotenv').config();
// const UserModel = require('../models/patient.model');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const { loginValidation, registerValidation} = require('../middleware/user.authentication');
// const { createAccessJWT } = require('../helper/createverifytoken')

// exports.userLogin = async(req, res) => {
//     const { error } = loginValidation(req.body);
//     if (error) {
//         return res.status(400).json({
//             status: false,
//             msg: error.details[0].message,
//             data: null,
//             statusCode: 400
//         });
//     }

//     try {
//         //check if admin exists
//         const admin = await UserModel.findOne({ email: req.body.email });
//         const oopsMessage = 'Oops, Your email or password is incorrect'
//         if (!admin) {
//             return res.status(401).json({
//                 status: false,
//                 msg: oopsMessage,
//                 data: null,
//                 statusCode: 401
//             })
//         }
//         //validate password
//         const validatePassword = await bcrypt.compare(req.body.password, admin.password);
//         if (!validatePassword) {
//             return res.status(401).json({
//                 status: false,
//                 msg: oopsMessage,
//                 data: null,
//                 statusCode: 401
//             })
//         }
//         //assign token
//           //assign assess and refresh tokens
//           const accessJWT = await createAccessJWT(admin.email, admin.id)
//           //const refreshJWT = await createRefreshJWT(admin.email)
//           //const stored =  await storeUserRefreshJWT(admin.id, refreshJWT,adminUserModel)


//         res.status(200).json({
//             status: true,
//             msg: 'Admin logged in succesfully',
//             data: {
//                 fullname: admin.fullname,
//                 email: admin.email,
//                 accessJWT
//             }
//         })
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             status: false,
//             msg: 'Internal Server Error',
//             data: null,
//             statusCode: 500
//         });
//     }
// }

// exports.userRegister = async(req, res) => {
//     const { error } = registerValidation(req.body);
//     if (error) {
//         return res.status(400).json({
//             status: false,
//             msg: error.details[0].message,
//             data: null,
//             statusCode: 400
//         });
//     }

//     try {
//         // check if email exists
//         const emailExist = await UserModel.findOne({ email: req.body.email });
//         if (emailExist) {
//             return res.status(400).json({
//                 status: false,
//                 msg: 'This email already exists',
//                 statusCode: 400
//             });
//         }

//         //hash the password
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(req.body.password, salt);

//         //prepare data to save
//         const user = new UserModel({
//             fullname: req.body.fullname,
//             email: req.body.email,
//             password: hashedPassword
//         })

//         //save admin
//         await user.save();
//         // res.json({
//         //     status: true,
//         //     msg: 'Admin user successfully created',
//         //     data: {
//         //         fullname: admin.fullname,
//         //         email: admin.email,
//         //     },
//         //     statusCode: 200
//         // })
//         res.send(data);

//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             status: false,
//             msg: 'Internal Server Error',
//             data: null,
//             statusCode: 500
//         });
//     }
// }


const User = require("./../models/user.model")
const {registerValidation,loginValidation} = require("../middleware/user.authentication")
const passport = require("passport")

// const signToken = id => {
//     return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
// }

exports.signup = async (req, res, next) =>{
    // const { error } = await registerValidation(req.body);
    //     if (error) {
    //         return res.status(400).json({
    //             status: false,
    //             msg: error.details[0].message,
    //             data: null,
    //             statusCode: 400
    //         });
    //     }
        console.log(req.body)
        const newUser = new User({
            name: req.body.name,
            username: req.body.username,
            role: req.body.role
        })
        const createdUser = await User.register(newUser, req.body.password)
        return res.redirect("/auth/login") 
    
}


exports.login = async (req, res, next) => {
    const { error } = loginValidation(req.body);
    if (error) {
        return res.status(400).json({
            status: false,
            msg: error.details[0].message,
            data: null,
            statusCode: 400
        });
    }
    
    passport.authenticate('local', function (error, user, info) {
        if (error) {
            req.flash("error", "Invalid credentials");
            return res.redirect("back");
        } else if (!user) {
            req.flash("error", "Invalid credentials");
            return res.redirect("back");
        } else {
            req.login(user, (err) => {
            if (err) {
                    req.flash("error", "Something went wrong!");
                    return res.redirect("back")
                } else {
                    req.flash("success", "Successfully logged In!");
                    return res.redirect("/")
                }
            })
        }
      })(req, res, next);
}


exports.logout = async (req, res, next) => {
    req.logout()
    req.flash("success", "Logged out successfully");
    res.redirect("/")
}