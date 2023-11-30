console.log('Web serverni boshlash');

const express = require('express');
const app = express();

const router = require('./router');
const router_bssr = require('./router_bssr');

const cookieParser = require('cookie-parser');

let session = require('express-session'); 
const MongoDBStore = require('connect-mongodb-session')(session); 
const store = new MongoDBStore({ 
    uri: process.env.MONGO_URL, 
    collection: "sessions" 
});

// 1: Kirish code 
app.use(express.static('public')); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use(cookieParser());

// 2: Session code  
app.use( 
    session({ 
        secret: process.env.SESSION_SECRET, 
        cookie: { 
            maxAge: 1000 * 60 * 30,
        },
        store: store, 
        resave: true,
        saveUninitialized: true 
    })
);

app.use(function(req, res, next) {
    res.locals.member = req.session.member;
    next();
});

// 3. View code
app.set("views", "views"); 
app.set("view engine", "ejs");

// 4: Routing code  

// hamma app(express)ga kirib kelayotgan "/resto"lik requestlar(m: localhost:3000/resto/signup, ...) - 'router_bssr.js' filega o'tib ketsin
app.use("/resto", router_bssr); // ( Traditional(BSSR) - EJS uchun ishlatamiz). Bu - ADMIN va RESTARANT userlar uchundir (BackEnddagi FrontEnd)

// hamma app(express)ga kirib kelayotgan "/"lik requestlar(m: localhost:3000/signup, ...) - 'router.js' filega o'tib ketsin
app.use("/", router); // (Modern(SPA) - REACT uchun ishlatamiz). Bu - haridorlar uchun kerakli bo'lgan FrontEnddir (FrontEnd)

module.exports = app; 