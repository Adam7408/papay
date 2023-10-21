// router filemizni ichida esa - expressni require qilib olishimiz kerak!
// va turli hil routerlarni shakllantiramiz 

const express = require('express');

// expressning ichidan Routerni olib chiqamiz
const router_bssr = express.Router();
const restaurantController = require("./controllers/restaurantController");
const productController = require("./controllers/productController");
const uploader_product = require('./utils/upload-multer')("products");

/**************************************************************************************
 *                      BSSR(EJS uchun kerak bo'lgan router)                          *
 **************************************************************************************/

// Bu yerda - RESTAURANT Controller bo'ladi, bu ham SERVICE MODELni ishlatadi ya'ni 'MEMBER'ni

// SIGNUP
router_bssr
    .get("/signup",restaurantController.getSingupMyRestaurant)
    .post("/signup", restaurantController.signupProcess);

// LOGIN
router_bssr
    .get("/login",restaurantController.getLoginMyRestaurant)
    .post("/login", restaurantController.loginProcess);

// LOGOUT
router_bssr.get("/logout", restaurantController.logout);
router_bssr.get("/check-me", restaurantController.checkSessions);


router_bssr.get("/products/menu",restaurantController.getMyRestaurantData); // restaurantga tegishli bo'lgan productlarni ma'lumotlarini olib kelsin

router_bssr.post(
    "/products/create", 
    restaurantController.validateAuthRestaurant, // "only authenticated members with restaurant type"
    uploader_product.array("product_images", 5), // 5tagacha
    productController.addNewProduct
);

router_bssr.post("/products/edit/:id", productController.updateChosenProduct);

// router_bssr.post("/products/edit");

// hosil qilgan routerni export qiilb olamiz
module.exports = router_bssr;