const express = require('express')
const path = require("path")
const connectDB = require('./server');
var expressLayouts = require('express-ejs-layouts');
const flash = require("connect-flash")
const passport = require("passport")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const fs = require('fs')
const mongoose = require("mongoose")
const session = require("express-session")
const MongoStore = require("connect-mongo")(session);

const app = express()

// app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine','ejs')
app.use(expressLayouts);


app.use(cookieParser());
app.use(
	session({
	  secret: "SECRET",
	  resave: false,
	  saveUninitialized: false,
	  cookie: { secure: false },
	  store: new MongoStore({
		mongooseConnection: mongoose.connection,
	  }),
	})
  );
  
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());



const userAuth = require('./routes/user.route');


app.use('/auth', userAuth);

port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})