// modellar - classlar bilan hosil bo'ladi

// user kiritgan ma'lumotlardan foydalanib - SIGNUPni hosil qilyapmiz

/*
Service modelimiz(Member.js)da - Schema model(member.model.js)ni chaqirib olamiz!
Chunki - Schema Modeldan datalarni olib, pasta ishlov beramiz
Va Service Model orqali Controllerga yuboramiz
*/
const MemberModel = require('../schema/member.model');

// mistake.jsdagi - Definer classni olib kelib, Definer variablega solib olamiz
const Definer = require('../lib/mistake');

// assert external packageni install qilamiz, va chaqirib olamiz
const assert = require('assert'); // assert -- ERROR instrumenti

/*
Biz userlarimizning passwordlarini - DataBasega to'g'ridan-to'g'ri qo'ymaymiz, shifralab qo'yamiz
Bcrypt packagening jozibali tomoni - userlarimizning passwordlarini biz ham bilmaymiz, shuning uchun Bcryptni tanlaymiz
*/
// bcryptjs external packageni install qilamiz, va chaqirib olamiz
const bcrypt = require('bcryptjs');

// Member class
class Member {
    constructor() {
        this.memberModel = MemberModel; // memberModel - Member classning statesi!.    MemberModel - buni ichida Schema Modelning ichidagi datalar bor        
    }

    // SIGNUPni mantigini yozamiz
    async signupData(input) {  // signupData()ni ishi - yangi memberlar hosil qilish, va u memberlarni DataBasega joylashtirish
        try{
            // DataBasega signup qilyatgan payt userimiz password yozadi
            // biz o'sha passwordni DataBasega sahranit qilishdan oldin 'hash' qilib olamiz 
            const salt = await bcrypt.genSalt(); // o'zimiz ham bilmaydigan qilib shifrlab beradi
            input.mb_password = await bcrypt.hash(input.mb_password, salt); 
            
            let result; // bu object
            const new_member = new this.memberModel(input); // new this.memberModel(input) - Schema Model Class
            try{ // MongoDB boshqacha formatdagi xatolikni beradi, shuning uchun try{} catch(){}ni ishlatamiz
                result = await new_member.save(); // new_member(inputga kirib kelgan ma'lumotlarni)ni - save() methodi orqali - DataBasege saqlaymiz
             } catch(mongo_err) { // mongoDBdan kelgan xatoni ushlab oladi
                console.log(mongo_err);
                throw new Error(Definer.auth_err1); // o'zimiz hohlagan ERRORni hosil qilib olamiz.   mistake.jsning ichidagi Definer degan classning auth_err1 degan static methodidagi (ya'ni: "att: mongoDB tekshiruvi amalga oshmadi")ni - ERROR qilib ko'rsatsin
            }
            
            result.mb_password = ""; // passwordni o'chirib qo'ysin, ya'ni password kelsin degan logic kiritilmaguncha - DataBase passwordni olib kelmasin

            return result; // natijani return qilamiz

        } catch(err) { // error bo'lsa
            throw err;
        }
    }    

    // LOGINni mantigini yozamiz
    async loginData(input) { // loginda compare algorithmni ishlatamiz
        try{
            const member = await this.memberModel // this.memberModel - Schema Model Classi
            .findOne( // memberModel classining - static methodi
                {mb_nick: input.mb_nick}, // mb_nick teng bo'lsin - inputning ichidagi mb_nickga (ya'ni inputga kirib kelgan ma'lumot - mb_nick, mb_password)
                {mb_nick: 1, mb_password: 1}) // mb_nick kerak, mb_password kerak, bu ikovini majbur chaqir!
            .exec(); // shu yerda amalga oshiramiz

            // DataBaseda - mb_nickga oyit data bo'lmasa -- xatolik ko'rsatish uchun ASSERT packagedan foydalanamiz
            assert.ok(member, Definer.auth_err3); // agar 'member' mavjud bo'lsa yoki true qiymatiga ega bo'lsa - hech qanday xatosiz o'tib ketaversin.    agar 'member' mavjud bo'lmasa yoki  false, null qiymatiga ega bo'lsa - ERRORni ko'rsatsin
        
            // const isMatch = input.mb_password === member.mb_password; // agar inputga kiritilgan password teng bo'lsa - memberning ichidagi passwordga (ya'ni DataBasedagi password)

            // compare qilamiz
            const isMatch = await bcrypt.compare( // inputga kiritilgan password bilan DataBasedan kelgan passwordni solishtirib, bizga tatijasini aytadi
                input.mb_password,  // inputga kiritilgan password
                member.mb_password  // DataBasedan kelgan password
            );

            assert.ok(isMatch, Definer.auth_err4); // agar isMatch true bo'lsa o'tib ketaversin,  false bo'lsa - ERRORni chiqarsin


            // manashu yergacha bajarilib kelsa - u user validated(tastiqlangan) hisoblanadi
            return await this.memberModel
            .findOne({
                mb_nick: input.mb_nick // mb_nick teng bo'lsin - inputdagi mb_nickga (ya'ni inpub.mb_nick desak ham, member.mb_nick desak ham bo'ladi, chunki ikovini qiymati bir hil)
            })
            .exec();
        } catch(err) {
            throw err;
        }
    }
}

module.exports = Member;