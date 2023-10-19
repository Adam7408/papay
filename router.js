// router filemizni ichida esa - expressni require qilib olishimiz kerak!
// va turli hil routerlarni shakllantiramiz 

const express = require('express'); // express frameworkni chaqirib olamiz

// expressning ichidan Routerni olib chiqamiz
const router = express.Router(); // Expressning Router() methodini - routerga tenglab olsak - router - object bo'ladi
const memberController = require("./controllers/memberController");


/**************************************************************************
 *             REST API(REACT uchun kerak bo'lgan router)                 *
 **************************************************************************/


// 'MEMBER'ga dahldor routerlar

/* 
router --- Clientning - browserning body qismida POST qilgan requestni olib - 'memberController.js'dagi
memberController objectining signup() methodiga tashlaydi
*/
router.post("/signup",  memberController.signup); // bu yerdagi callbackni - 'memberController.js'dagi memberController objectining signup() methodiga oborib qo'ydik
router.post("/login", memberController.login);
router.get("/logout",memberController.logout);

//** post(), get() methodlari - async callback methoddir




// boshqa routerlar
router.get("/menu", (req, res) => { // localhost:3000/menu
    res.send("Menu sahifadasiz");
});


router.get("/community", (req, res) => { // localhost:3000/community
    res.send("Jamiyat sahifadasiz");
});

module.exports = router; // hosil qilgan routerni export qiilb olamiz