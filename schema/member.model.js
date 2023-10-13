const mongoose = require("mongoose"); 
const { member_status_enums, member_type_enums } = require("../lib/config"); 
 
// memberSchema Model orqali - MongoDB - ma'lumotlarni DataBasega yoza boshlaydi  
// agar DataBasemiz bo'lmasa - MongoDB -- 자동으로 magrition qiladi, ya'ni 'collection' ochib beradi   
const memberSchema = new mongoose.Schema({ 
    // bizga 'member' bo'yicha nima kerak bo'ladi? 
    /* 
    ER Model qilgan paytimiz - mb_nick kerak edi 
 
    */ 
 
    // kimdir ishlatgan mb_nichni - boshqa odamlar ishlata olmasin 
    // ya'ni 'unit' bolishi kerak degan shart bor 
    mb_nick: { 
        type: String, 
        required: true, // talab qilinishi hardoim bo'lishi kerak 
        // shuni yozsak - agar mb_nick DataBasemizda ishlatilgan bo'lsa  - DataBasemiz - duplicated(takrorlangan) degan xatolikni yuboradi va DataBasega yozmaydi 
        index: {unique: true, sparce: true} 
    }, 
    mb_phone: { 
        type: String, 
        required: true 
    },  
    mb_password: { 
        type: String, 
        required: true, 
        // passwordni keyinchalik request qilyatgan payti bizga DataBase by default holatda qaytarmasligi uchun: 
        select: false 
    }, 
    mb_type: { 
        type: String, 
        required: false, 
        default: "USER", // hech qanday ma'lumot kelmasa - USER by default bo'ladi 
        // bu enum valuelarnigina qabul qilib oladi 
        enum: { 
            values: member_type_enums, 
            // agar manashulardan boshqa qiymatlar kelsa - bizning DataBasemizga DATA yozilmaydi ya'ni fail bo'ladi, xatolik yuzaga keladi 
            message: "{VALUES} ruxsat etilgan qiymatlar qatoriga kirmaydi" 
            // keyin biz bu xatolikni - catch qilib, bu xatolikni response qilib yuboramiz 
        } 
    }, 
    // enum valuelarni ko'p ishlatamiz  
    mb_status: { 
        type: String, 
        required: false, 
        default: "ACTIVE",  
        enum: { 
            values: member_status_enums, 
            // agar manashulardan boshqa qiymatlar kelsa - bizning DataBasemizga DATA yozilmaydi ya'ni fail bo'ladi, xatolik yuzaga keladi 
            message: "{VALUES} ruxsat etilgan qiymatlar qatoriga kirmaydi" 
            // keyin biz bu xatolikni - catch qilib, bu xatolikni response qilib yuboramiz 
        } 
    }, 
    mb_address: { 
        type: String, 
        required: false 
    }, 
    mb_description: { 
        type: String, 
        required: false
    }, 
     
    mb_image: { 
        type: String, 
        required: false 
    }, 
    mb_point: { 
        type: Number, 
        required: false, 
        default: 0 
    }, 
    // Restarantlar kerlama uchun pul bersa - uni 'top Restarant'larga chiqaramiz  
    mb_top: { 
        type: String, 
        required: false, 
        default: 'N', 
        enum: { 
            values: ordernary_enums, 
            message: "{VALUES} ruxsat etilgan qiymatlar qatoriga kirmaydi" 
        } 
    }, 
 
    mb_views: { 
        type: Number, 
        required: false, // talab qilinmaydi 
        default: 0 
    }, 
 
    mb_likes: { 
        type: Number, 
        required: false, // talab qilinmaydi 
        default: 0 
    }, 
 
    mb_follow_cnt: { 
        type: Number, 
        required: false, // talab qilinmaydi 
        default: 0 
    }, 
 
    mb_subscriber_cnt: { 
        type: Number, 
        required: false, // talab qilinmaydi 
        default: 0
    }, 
 
    // MongoDB - 자동으로 ikki hil qiymatni qo'yib beradi  
    // bular - 'createdAt', va 'updatedAt' 
    // {timestamps: {createAt:'created_at',updatedAt:'updated_at'}}, 
    timestamps:true
}); 
 
 
// endi Modelni shakllantirib olamiz 
/* 
bizning Databasemiz - 'Member' so'zini avtomatik ravishta ko'plik shakllga o'tkazib oladi, biz birlik shaklini qo'yishimiz kerak 
'Member'ni --> Members qilib oladi 
Name yozsak --> Names qilib oladi 
 
model()ni ikkinchi qismiga - tepada yasab olgan 'memberSchema'mizni pass qilishimiz kerak 
*/ 
module.exports = mongoose.model("Member", memberSchema);