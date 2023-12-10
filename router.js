const express = require('express'); 
const router = express.Router(); 
const memberController = require("./controllers/memberController");
const productController = require("./controllers/productController");
const restaurantController = require("./controllers/restaurantController");
const orderController = require("./controllers/orderController");
const communityController = require("./controllers/communityController");

const uploader_community = require('./utils/upload-multer')("community");
const uploader_member = require('./utils/upload-multer')("member");


/**************************************************************************
 *             REST API(REACT uchun kerak bo'lgan router)                 *
 **************************************************************************/

// MEMBER related routers
router.post("/signup", memberController.signup); 
router.post("/login", memberController.login);
router.get("/logout", memberController.logout);
router.get("/check-me", memberController.checkMyAuthentication);
router.get(
    "/member/:id", 
    memberController.retrieveAuthMember,
    memberController.getChosenMember
);


// PRODUCT related routers
router.post(
    "/products", 
    memberController.retrieveAuthMember,
    productController.getAllProducts
);

router.get(
    "/products/:id", 
    memberController.retrieveAuthMember,
    productController.getChosenProduct
);

// RESTAURNAT related routers
router.get(
    "/restaurants", 
    memberController.retrieveAuthMember,
    restaurantController.getRestaurants
);

router.get(
    "/restaurants/:id",
    memberController.retrieveAuthMember,
    restaurantController.getChosenRestaurant
);

// ORDER related routers
router.post(
    "/orders/create",
    memberController.retrieveAuthMember,
    orderController.createOrder
);

router.get(
    "/orders",
    memberController.retrieveAuthMember,
    orderController.getMyOrders
);

router.post(
    "/orders/edit",
    memberController.retrieveAuthMember,
    orderController.editChosenOrder
);

// COMMUNITY related routers
router.post(
    "/community/image",
    uploader_community.single('community_image'),
    communityController.imageInsertion
);

router.post(
    "/community/create",
    memberController.retrieveAuthMember,
    communityController.createArticle
);

router.get(
    "/community/articles",
    memberController.retrieveAuthMember,
    communityController.getMemberArticles
);

module.exports = router; 