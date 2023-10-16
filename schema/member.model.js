
const mongoose = require("mongoose"); 
const { member_status_enums, member_type_enums,ordernary_enums  } = require("../lib/config"); 
 

const memberSchema = new mongoose.Schema({ 
    
    mb_nick: { 
        type: String, 
        required: true, // talab qilinishi hardoim bo'lishi kerak 
        // shuni yozsak - agar mb_nick DataBasemizda ishlatilgan bo'lsa  - DataBasemiz - duplicated(takrorlangan) degan xatolikni yuboradi va DataBasega yozmaydi 
        index: {unique: true, sparse: true} 
    }, 
    mb_phone: { 
        type: String, 
        required: true, 
        index: {unique: true, sparse: true} 
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
 
},
    {timestamps:true}
); 
 

module.exports = mongoose.model("Member", memberSchema);