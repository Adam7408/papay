const exp = require('express');

const router_bssr = exp.Router(); 
const restaurantController = require("./controllers/restaurantController");
const productController = require("./controllers/productController");
const uploader_product = require('./utils/upload-multer')("products");

/**************************************************************************************
 *                      BSSR(EJS uchun kerak bo'lgan router)                          *
 **************************************************************************************/

// HOME
router_bssr.get("/",restaurantController.home);

// SIGNUP
router_bssr
    .get("/sign-up",restaurantController.getSingupMyRestaurant)
    .post("/sign-up", restaurantController.signupProcess);

// LOGIN
router_bssr
    .get("/login",restaurantController.getLoginMyRestaurant)
    .post("/login", restaurantController.loginProcess);

// LOGOUT
router_bssr.get("/logout", restaurantController.logout);
router_bssr.get("/check-me", restaurantController.checkSessions);

// /PRODUCTS/MENU
router_bssr.get("/products/menu",restaurantController.getMyRestaurantProducts); 

// /PRODUCTS/CREATE
router_bssr.post(
    "/products/create", 
    restaurantController.validateAuthRestaurant, 
    uploader_product.array("product_images", 5), 
    productController.addNewProduct
);

// /PRODUCTS/EDIT/:ID
router_bssr.post(
    "/products/edit/:id", 
    restaurantController.validateAuthRestaurant,
    productController.updateChosenProduct
);

module.exports = router_bssr; 