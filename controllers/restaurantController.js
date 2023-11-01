const Product = require("../models/Product");
const Member = require("../models/Member");
const Definer = require("../lib/mistake");
const assert = require("assert");

let restaurantController = module.exports;

//================================================= GET ===============================================================
restaurantController.home = (req, res) => {
    try {
        console.log("GET: restaurant homega kimdir kirdi");

        res.render("home-page");
    } catch (err) {
        console.log(
            `ERROR: restaurant homega kirishda xatolik boldi! ${err.message}`
        );
        res.json({ state: "muvaffaqiyatsiz!", message: err.message });
    }
};

//================================================= GET ===============================================================
restaurantController.getMyRestaurantProducts = async (req, res) => {
    try {
        console.log("GET: getMyRestaurantProductsga kimdir kirdi!");

        const product = new Product();
        const data = await product.getAllProductsDataResto(res.locals.member);

        res.render("restaurant-menu", { restaurant_data: data });
    } catch (err) {
        console.log(
            `ERROR: getMyRestaurantProductsga kirishda xatolik boldi! ${err.message}`
        );
        res.json({ state: "muvaffaqiyatsiz!", message: err.message });
    }
};

//================================================= GET ===============================================================
restaurantController.getSingupMyRestaurant = async (req, res) => {
    try {
        console.log("GET: getSingupMyRestaurantga kimdir kirdi!");

        res.render("signup");
    } catch (err) {
        console.log(
            `ERROR: getSingupMyRestaurantga kirishda xatolik boldi! ${err.message}`
        );
        res.json({ state: "muvaffaqiyatsiz!", message: err.message });
    }
};

//================================================= POST ===============================================================
restaurantController.signupProcess = async (req, res) => {
    try {
        console.log("POST: signupProcessga kimdir kirdi!");

        assert.ok(req.file, Definer.general_err3);

        console.log("req.file", req.file);
        console.log("req.body", req.body);

        let new_member = req.body;
        new_member.mb_type = "RESTAURANT";
        new_member.mb_image = req.file.path;

        const member = new Member();
        const result = await member.signupData(new_member);

        assert.ok(result, Definer.general_err1);

        // SESSION
        req.session.member = result;

        res.redirect("/resto/products/menu");
    } catch (err) {
        console.log(
            `ERROR: controller.signupga kirishda xatolik boldi! ${err.message}`
        );
        res.json({ state: "muvaffaqiyatsiz!", message: err.message });
    }
};

//============================================== GET ===============================================================
restaurantController.getLoginMyRestaurant = async (req, res) => {
    try {
        console.log("GET: getLoginMyRestaurantga kimdir kirdi!");

        res.render("login-page");
    } catch (err) {
        console.log(
            `ERROR: getLoginMyRestaurantga kirishda xatolik boldi! ${err.message}`
        );
        res.json({ state: "muvaffaqiyatsiz!", message: err.message });
    }
};

//============================================== POST ===============================================================
restaurantController.loginProcess = async (req, res) => {
    try {
        console.log("POST: loginProcessga kimdir kirdi!");

        const data = req.body;

        const member = new Member();
        const result = await member.loginData(data);

        // SESSION
        req.session.member = result;

        req.session.save(function () {
            result.mb_type === "ADMIN"
                ? res.redirect("/resto/all-restaurant")
                : res.redirect("/resto/products/menu");
        });
    } catch (err) {
        console.log(
            `ERROR: controller.loginga kirishda xatolik boldi! ${err.message}`
        );
        res.json({ state: "muvaffaqiyatsiz!", message: err.message });
    }
};

//============================================== GET ===============================================================
restaurantController.logout = (req, res) => {
    try {
        console.log("GET: kimdir logout qildi");

        req.session.destroy(function () {
            res.redirect("/resto");
        });
    } catch (err) {
        console.log(
            `ERROR: controller.loginga kirishda xatolik boldi! ${err.message}`
        );
        res.json({ state: "muvaffaqiyatsiz!", message: err.message });
    }
};

//============================================== POST ===============================================================
restaurantController.validateAuthRestaurant = (req, res, next) => {
    if (req.session?.member?.mb_type === "RESTAURANT") {
        req.member = req.session.member;
        next();
    } else
        res.json({
            state: "neudachno",
            message: "only authenticated members with restaurant type",
        });
};

//============================================== GET ===============================================================
restaurantController.checkSessions = (req, res) => {
    if (req.session?.member) {
        res.json({ state: "muvaffaqiyatli", data: req.session.member });
    } else {
        res.json({
            state: "muvaffaqiyatsiz!",
            message: "You are not authenticated",
        });
    }
};
