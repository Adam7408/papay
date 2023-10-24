// clientlarning requestlarini 

const express = require('express'); // framework

const router_bssr = express.Router(); // expressning ichidan Routerni olib chiqamiz
const restaurantController = require("./controllers/restaurantController");
const productController = require("./controllers/productController");
const uploader_product = require('./utils/upload-multer')("products");

/**************************************************************************************
 *                      BSSR(EJS uchun kerak bo'lgan router)                          *
 **************************************************************************************/

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

// /PRODUCTS/MENU
router_bssr.get("/products/menu",restaurantController.getMyRestaurantData); // restaurantga tegishli bo'lgan productlarni ma'lumotlarini olib kelsin

// /PRODUCTS/CREATE
router_bssr.post(
    "/products/create", 
    restaurantController.validateAuthRestaurant, // "only authenticated members with restaurant type"
    uploader_product.array("product_images", 5), // 5tagacha
    productController.addNewProduct
);

// /PRODUCTS/EDIT/:ID
router_bssr.post(
    "/products/edit/:id", 
    restaurantController.validateAuthRestaurant,
    productController.updateChosenProduct
);

module.exports = router_bssr; // hosil qilgan routerlarni export qilamiz 