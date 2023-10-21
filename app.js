console.log('Web serverni boshlash');

// express frameworkini install qilib, chaqiriladi
const exp = require('express'); // express - 4 qismdan iborat: 1) kirish code,

// express - documentation bo'yicha - undan instance yasashimiz kerak
const app = exp(); // expressning objectini - appga tenglab olamiz, va appdan foydalanib - Express Web Server quramiz

const router = require('./router');
const router_bssr = require('./router_bssr');

let session = require('express-session'); // express-sessionni install qilamiz, va chaqirib olamiz
const MongoDBStore = require('connect-mongodb-session')(session); // connect-mongodb-session - MongoDBni Storigeni hosil qilishda yordam beradigan MongoDB Session
// MongoDBStore bu - CLASS

// MongoDBga ulanish
const store = new MongoDBStore({ // MongoDBStore classi orqali - store degan object yasab olamiz
    uri: process.env.MONGO_URL, // 1) parameter: - .env filedagi MONGO_URL(DataBase connection string)ni yozamiz
    collection: "sessions" // 2) parameter: collectionning nomini sessions deymiz, MongoDBda sessions degan collection hosil bo'ladi, va uni ichida - Session Authenticationlar yoziladi
});

// 1: Kirish code  (Expressning 1nchi qismi)
// bu bosqichda - Expressga kirib kelayotgan ma'lumotlarga bog'liq bo'lgan codelar yozidali

// harqanday browserdan kirib kelayotgan requestlar uchun - public folderi ochiq, ya'ni faqatgina public folderni ko'ra oladi
app.use(exp.static('public')); // buplic folderni ichida: frontEndga tegishli bo'lgan JS, CSS, imagelar bo'ladi
// user() method: Serverdagi public folderni - tashqariga ochib beradi(ya'ni user uni bemalol ko'ra oladi)

app.use(exp.json()); 
// 1) Serverga kirib kelyatgan "json"larni - kirishga ruxsat beradi
// 2) Va tashqariga ma'lumot chiqarayotganda - "json"ni object qilib beradi

app.use(exp.urlencoded({ extended: true })); // Traditional(BSSR) form postlarni qabul biladi ( HTML <form> )
// HTML formalari orqali POST so'rovlarini qabul qiladi va ulardan kelgan ma'lumotlarni analiz qilish uchun ishlatiladi.


// 2: Session code   (Expressning 1nchi qismi)
app.use( 
    session({ // object.   
        secret: process.env.SESSION_SECRET, // secret code bo'ladi, SESSION_SECRETni - .env filega yozib olamiz
        cookie: { // Session - cookielar bilan ishlayapti ya'ni - Session with Cookies
            maxAge: 1000 * 60 * 30, // Cookie pancha vaqt uchun bo'lsin? deyilyapti
        },
        store: store, // store - avtamatik ravishda MongoDBning sessions collectioniga saqlansin
        resave: true, // User - datalarini o'zgartirgan chog'ida ham - session datalarini qaytadan saqlasin
        saveUninitialized: true // session-express - Userning DataBasedagi session datalarini saqlashni boshlasin
    })
);
// demak: sessionlarni ishga turishdir, MongoDBga ham uladik,  endi har qanday kelgan requestlar - session orqali o'tadi, shu yerda validation qilinadi

// har bir kelayotgan request uchun - 
app.use(function(req, res, next) {
    res.locals.member = req.session.member; // responseni locals valiablini ichida member degan variablga - requestni session memberni yukla
    next();
});

// 3: Views code    (Expressning 1nchi qismi) (ko'rinish codelar)

app.set("views", "views"); // views - hamma FrontEndga yuborilayotgan template enginelarning folderi, hammasi 'views' ichida saqlanadi

app.set("view engine", "ejs"); // view engine ya'ni template engine - 'ejs'ni ishlatamiz
// bu yerda set() methodi - 'view' folderni sozlashda, sahifamiz qaysi templateda shakllanishini ko'rsatadi
// templatelar: ejs, Pug(Jade), Handlebors, React, Angular, Vue.js.....

// demak, EJS orqali - BackEndda FrontEnd yasaymiz


// 4: Routing code   (Expressning 1nchi qismi)

// hamma app(express)ga kirib kelayotgan "/resto"lik requestlar(m: localhost:3000/resto/signup, ...) - 'router_bssr.js' filega o'tib ketsin
app.use("/resto", router_bssr); // ( Traditional(BSSR) - EJS uchun ishlatamiz). Bu - ADMIN va RESTARANT userlar uchundir (BackEnddagi FrontEnd)

// hamma app(express)ga kirib kelayotgan "/"lik requestlar(m: localhost:3000/signup, ...) - 'router.js' filega o'tib ketsin
app.use("/", router); // (Modern(SPA) - REACT uchun ishlatamiz). Bu - haridorlar uchun kerakli bo'lgan FrontEnddir (FrontEnd)

module.exports = app; // appni export qilamiz