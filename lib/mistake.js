class Definer {
    // GENERAL errors
    static general_err1 = "att: nimadir xato bo'ldi!";
    static general_err2 = "att: bunaqa parameterdagi data yo'q!";
    static general_err3 = "att: file upload qilishda xatolik bo'ldi!";

    // MEMBER AUTHENTICATION related errors
    static auth_err1 = "att: mongoDB tekshiruvi amalga oshmadi!";
    static auth_err2 = "att: jwt yasashda xatolik bo'ldi!";
    static auth_err3 = "att: bu nicknamedagi user yo'q!";
    static auth_err4 = "att: hisob ma'lumotlariz to'g'ri kelmayapti!";
	static auth_err5 = "att: siz tasdiqlanmagansiz!";

    // PRODUCT related errors
    static product_err1 = "att: product hosil qilishda xatolik bo'ldi!";

    // ORDER related errors
    static order_err1 = "att: buyurtma qilishda xatolik bo'ldi!";
	static order_err2 = "att: buyurtma elementi yasab bo'lmadi!";
	static order_err3 = "att: bunday order mavjud emas!";

    // MONGODB related errors
    static mongo_validation_err1 = "att: mongodb tekshiruvi amalga oshmadi!";
}

module.exports = Definer;