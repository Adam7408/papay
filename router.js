const express = require('express'); 
const router = express.Router(); 
const memberController = require("./controllers/memberController");


/**************************************************************************
 *             REST API(REACT uchun kerak bo'lgan router)                 *
 **************************************************************************/

router.post("/signup",  memberController.signup); 
router.post("/login", memberController.login);
router.get("/logout",memberController.logout);
router.get("/check-me", memberController.checkMyAuthentication);

// boshqa routerlar
router.get("/menu", (req, res) => { 
    res.send("Menu sahifadasiz");
});


router.get("/community", (req, res) => { 
    res.send("Jamiyat sahifadasiz");
});

module.exports = router; 