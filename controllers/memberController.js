// bitta object yasab olamiz, hamda bu objectni - modulning ichidagi exportsga tenglashtiramiz
// bu degani - endi biz bemalol 'memberController'larga - turli hil methodlarni yuklay olamiz degani
let memberController = module.exports;

const Member = require("../models/Member");

// 'router.js'dagi routerning yuborgan(POST qilgan) request - shu signup() methodga keladi
memberController.signup = async (req, res) => { // signup() - methodi - asunc methoddir ya'ni async callback emas!    callback esa - 'router.js'dan keldi! (Chunki bu - 'router.js'dagi routerning davomi)
    try{ // async functionda - hardoim try catch() bo'lishi shart
        console.log('POST: controller / signupga kimdir kirdi!');
        const data = req.body; // routerdan kelgan requestning bodysini(mb_nick: ali, mb_password: ali2000, mb_phone: 123456789) dataga solib oldik

        const member = new Member(); // Member Service Modeldan instance olamiz, ya'ni object yasaymiz
        const new_member = await member.signupData(data); // signupData() methodiga datani berdik, va qaygan javobni - new_memberga solib oldik

        // AUTHENTICATE BASED ON JWT (Json Web Token - Tokenlarni Cookie ichida ishlaydigan method)

        res.json({state: 'muvaffaqiyatli', data: new_member});
    } catch(err){ // catch()ni qo'yishimiz sababi: 'try'da - xatolik chiqsa - catch() ushlab oladi
        console.log(`ERROR: controller / signupga kirishda xatolik boldi! ${err.message}`); 
        res.json({state: 'muvaffaqiyatsiz', message: err.message}); // Browserga xatolikni yuboradi
    }
};

// memberController objecti - signup methodini ishga tushiryapdi
memberController.login = async (req, res) => {
    try{
        console.log('POST: controller / loginga kimdir kirdi!');
        const data = req.body; // ya'ni POSTMANdagi signup body qismidagi 3ta ma'lumot: mb_nick, mb_password, mb_phone
        // console.log('Body:::', req.body);

        const member = new Member();
        const result = await member.loginData(data);

        res.json({state: 'muvaffaqiyatli', data: result});
    } catch(err){
        console.log(`ERROR: controller / loginga kirishda xatolik boldi! ${err.message}`);
        res.json({state: 'muvaffaqiyatsiz', message: err.message});
    }
}

// memberController objecti - logout methodini ishga tushiryapdi
memberController.logout = (req, res) => {
    console.log('POST: controller / logoutga kimdir kirdi!');
    res.send("Logout sahifadasiz");
}






