const exp = require('express'); // framework

const router_bssr = exp.Router(); // expressning ichidan Routerni olib chiqamiz
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
router_bssr.get("/products/menu",restaurantController.getMyRestaurantProducts); // restaurantga tegishli bo'lgan productlarni ma'lumotlarini olib kelsin

// /PRODUCTS/CREATE
router_bssr.post(
    "/products/create", 
    restaurantController.validateAuthRestaurant, // "only authenticated members with restaurant type"
    uploader_product.array("product_images", 5), // 5tagacha
    productController.addNewProduct
);

// "/PRODUCTS/EDIT/:ID" - (URLda ikkita narsa bor: PARAMS va QUERY, biz paramdan olyapmiz)
router_bssr.post(
    "/products/edit/:id", // bu yerda bitta param bor, yana bitta param yuborsak ham bo'ladi ("/products/edit/:id/:ids")
    restaurantController.validateAuthRestaurant,
    productController.updateChosenProduct
);

module.exports = router_bssr;