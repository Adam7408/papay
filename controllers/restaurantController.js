const Product = require("../models/Product");
const Member = require("../models/Member");

let restaurantController = module.exports; // restaurantController - bu object
/*
Bu yerda - BackEndni ichida FrontEnd qurilyapdi, demak biron bir operatsiya yuzaga kelishidan oldin ma'lum bir EJS pagega borish kerak
misol uchun: GET orqali - qaysidir signup pagega yoki qaysidir login pagega borish kerak 
*/

restaurantController.home = (req, res) => {
    try{
        console.log("GET: restaurant homega kimdir kirdi");
        res.render("home-page");
    } catch(err) {
        console.log(`ERROR: restaurant homega kirishda xatolik boldi! ${err.message}`);
        res.json({state: 'muvaffaqiyatsiz!', message: err.message});
    }
}

restaurantController.getMyRestaurantProducts = async (req, res) => { 
    try{
        // signupProcessini qilib bo'lgandan keyin - shu yerga keladi
        // productlarni - DataBasedan chaqirib olib - userni restaurant-menu pagesiga kutib oladi

        console.log('GET: getMyRestaurantProductsga kimdir kirdi!'); 
        // TODO: getMyRestaurant products
        // productController va product Schema model hosil qilamiz
        const product = new Product();
        const data = await product.getAllProductsDataResto(res.locals.member);

        res.render("restaurant-menu", { restaurant_data: data });
    } catch(err){
        console.log(`ERROR: getMyRestaurantProductsga kirishda xatolik boldi! ${err.message}`);
        res.json({state: 'muvaffaqiyatsiz!', message: err.message});
    }
}

//================================================= GET ===============================================================

// (signup pageni ochib ber) degan request kelyapti
restaurantController.getSingupMyRestaurant = async (req, res) => { 
    try{
        console.log('GET: getSingupMyRestaurantga kimdir kirdi!'); 
        res.render('signup'); // render berish kerak ya'ni browserga page berish kerak, 'signup.ejs' pagega yuborsin
    } catch(err){
        console.log(`ERROR: getSingupMyRestaurantga kirishda xatolik boldi! ${err.message}`);
        res.json({state: 'muvaffaqiyatsiz!', message: err.message});
    }
}
// GET qismini shakllantirib bo'ldik
//-----------------------------------------------------------------------------------------------------------------------------


//================================================= POST ===============================================================
restaurantController.signupProcess = async (req, res) => {
    try{
        console.log('POST: controller.signupga kimdir kirdi!'); // routerdan kirib kelyatgan requestni 
        
        const data = req.body; // requestni body qismidan ma'lumotni olamiz
        const member = new Member();
        const new_member = await member.signupData(data);

        req.session.aa = new_member; // requestning ichiga sessionni - member bilan hosil qilamiz, va new_memberni tenglab qo'yamiz
        // shundan keyin - user request qilsa - Server uni taniydi, ya'ni Server - member objectining ichiga qarasa - Userning datalari turadi

        // signupProcessi qilingandan keyin - userni localhost:3000/resto/products/menuga yuboradi
        res.redirect("/resto/products/menu"); // boshpa pagega yuborish methodi

        // SESSION with COOKIES(Sessionlar - Cookielar bilan ishlaydigan method)
        // memberController bilan restaurantController bir hil, farqi esa - restaurantControllerda - login qilingandan keyin - Session Authenticationni quramiz 

        // res.json({state: 'succed', data: new_member}); // datani ichiga new_memberni beramiz
    } catch(err){
        console.log(`ERROR: controller.signupga kirishda xatolik boldi! ${err.message}`);
        res.json({state: 'muvaffaqiyatsiz!', message: err.message});
    }

};
// POST qismini shakllantirib bo'ldik

//============================================== GET ===============================================================
restaurantController.getLoginMyRestaurant = async (req, res) => {
    try{
        console.log('GET: getLoginMyRestaurantga kimdir kirdi!');
        res.render('login-page'); // render berish kerak ya'ni page berish kerak, biz signup pageni beramiz 
    } catch(err){
        console.log(`ERROR: getLoginMyRestaurantga kirishda xatolik boldi! ${err.message}`);
        res.json({state: 'muvaffaqiyatsiz!', message: err.message});
    }
}

//============================================== POST ===============================================================
restaurantController.loginProcess = async (req, res) => {
    try{
        console.log('POST: controller.loginga kimdir kirdi!'); // routerdan kirib kelyatgan requestni 
        
        const data = req.body; // requestni body qismidan ma'lumotni olamiz
        const member = new Member();
        const result = await member.loginData(data);

        req.session.member = result; 
        
        // login bo'lgan memberga qarab - turli hil routerlarga yuborsak bo'ladi
        req.session.save(function() { // save() method
            res.redirect("/resto/products/menu"); // boshpa pagega yuborish methodi
        });

        /*
        hozirgacha - signup, login qilganda - sessionni qanday hosil qilishni ko'rib chiqdik 
        endi uni ishlatishni ko'rib chiqamiz:
        sessionning mantigi shuki: "biz login bo'lgan paytimiz - Serverdan qandaydir tamg'a(ruhsat qog'oz, bilet) bostirib olamiz, va bu tamg'ani o'zimiz bilan birga olib yuramiz, keyin Serverga get yoki post request qilganimizda - Server bizni request qilganini session orqali taniydi(sessionimizni vaqti tugagandan keyin - Server bizni tanimaydi)
        */

    } catch(err){
        console.log(`ERROR: controller.loginga kirishda xatolik boldi! ${err.message}`);
        res.json({state: 'muvaffaqiyatsiz!', message: err.message});
    }
}

//============================================== GET ===============================================================
restaurantController.logout = (req, res) => {
    console.log('GET cont.logout');
    res.send("Logout sahifadasiz");
}

restaurantController.validateAuthRestaurant = (req, res, next) => {
    if(req.session?.member?.mb_type === "RESTAURANT") {
        req.member = req.session.member;
        next();
    } else 
    res.json({
        state: "neudachno", 
        message: "only authenticated members with restaurant type"
    });
};

restaurantController.checkSessions = (req, res) => {
    if(req.session?.member){
        res.json({state: 'muvaffaqiyatli', data: req.session.member});
    } else{
        res.json({state: 'muvaffaqiyatsiz!', message: "You are not authenticated"});
    }
};