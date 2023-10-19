// bitta object yasab olamiz, hamda bu objectni - modulning ichidagi exportsga tenglashtiramiz
// bu degani - endi biz bemalol 'memberController'larga - turli hil methodlarni yuklay olamiz degani
// let restaurantController = module.exports;
let restaurantController = module.exports;

const Member = require("../models/Member");

/*
Bu yerda - BackEndni ichida FrontEnd qurilyapdi, demak biron bir operatsiya yuzaga kelishidan oldin ma'lum bir EJS pagega borish kerak
misol uchun: GET orqali - qaysidir signup pagega yoki qaysidir login pagega borish kerak 
*/

//================================================= GET ===============================================================

// (signup pageni ochib ber) degan request kelyapti
restaurantController.getSingupMyRestaurant = async (req, res) => { 
    try{
        console.log('GET: restaurantController.getSingupMyRestaurantga kimdir kirdi!'); 
        res.render('signup'); // render berish kerak ya'ni browserga page berish kerak, 'signup.ejs' pagega yuborsin
    } catch(err){
        console.log(`ERROR: restaurantController.getSingupMyRestaurantga kirishda xatolik boldi! ${err.message}`);
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

        // SESSION with COOKIES(Sessionlar - Cookielar bilan ishlaydigan method)
        // memberController bilan restaurantController bir hil, farqi esa - restaurantControllerda - login qilingandan keyin - Session Authenticationni quramiz 

        // console.log('body::', req.body);

        res.json({state: 'succed', data: new_member}); // datani ichiga new_memberni beramiz
    } catch(err){
        console.log(`ERROR: controller.signupga kirishda xatolik boldi! ${err.message}`);
        res.json({state: 'muvaffaqiyatsiz!', message: err.message});
    }

};
// POST qismini shakllantirib bo'ldik

//============================================== GET ===============================================================
restaurantController.getLoginMyRestaurant = async (req, res) => {
    try{
        console.log('GET: restaurantController.getSingupMyRestaurantga kimdir kirdi!');
        res.render('login-page'); // render berish kerak ya'ni page berish kerak, biz signup pageni beramiz 
    } catch(err){
        console.log(`ERROR: restaurantController.getSingupMyRestaurantga kirishda xatolik boldi! ${err.message}`);
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

        // console.log('body::', req.body);

        res.json({state: 'succed', data: result}); // datani ichiga new_memberni beramiz
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