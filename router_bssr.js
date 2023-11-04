const exp = require('express'); 
const router_bssr = exp.Router(); 

const restaurantController = require("./controllers/restaurantController");
const productController = require("./controllers/productController");

const uploader_product = require('./utils/upload-multer')("products");
const uploader_members = require('./utils/upload-multer')("members");


/**************************************************************************************
 *                      BSSR(EJS uchun kerak bo'lgan router)                          *
 **************************************************************************************/


// HOME
router_bssr.get("/",restaurantController.home);

// SIGN-UP
router_bssr
    .get("/sign-up",restaurantController.getSingupMyRestaurant)
    .post(
        "/sign-up", 
        uploader_members.single('restaurant_img'), 
        restaurantController.signupProcess
    );

// LOGIN
router_bssr
    .get("/login",restaurantController.getLoginMyRestaurant)
    .post("/login", restaurantController.loginProcess);

// LOGOUT
router_bssr.get("/logout", restaurantController.logout);
router_bssr.get("/check-me", restaurantController.checkSessions);

// (RESTAURANT) restaurant menu
router_bssr.get(
    "/products/menu",
    restaurantController.validateAuthRestaurant,
    restaurantController.getMyRestaurantProducts); // restaurantga tegishli bo'lgan productlarni ma'lumotlarini olib kelsin

// (RESTAURANT) create product
router_bssr.post(
    "/products/create", 
    restaurantController.validateAuthRestaurant, 
    uploader_product.array("product_images", 5), 
    productController.addNewProduct
);

// (RESTAURANT) edit product - (URLda ikkita narsa bor: PARAMS va QUERY)
router_bssr.post(
    "/products/edit/:id", // bu yerda bitta param bor, yana bitta param yuborsak ham bo'ladi ("/products/edit/:id/:ids")
    restaurantController.validateAuthRestaurant,
    productController.updateChosenProduct
);

// (ADMIN) all restaurant
router_bssr.get( 
    "/all-restaurant",
    restaurantController.validateAdmin,
    restaurantController.getAllRestaurants 
);

// (ADMIN) edit restaurant
router_bssr.post( 
    "/all-restaurant/edit",
    restaurantController.validateAdmin,
    restaurantController.updateRestaurantByAdmin );

module.exports = router_bssr; 