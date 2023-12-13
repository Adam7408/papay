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

	// ARTICLES related errors
	static article_err1 = "att: maqolalar uchun muallif a'zosi taqdim etilmagan!";
	static article_err2 = "att: bu a'zo uchun hech qanday maqola topilmadi!";
	static article_err3 = "att: bu maqsad uchun hech qanday maqola topilmadi!";

    // FOLLOW related errors
    static follow_err1 = "att: o'ziga o'zi obuna bo'lish rad etilgan!";
    static follow_err2 = "att: yangi obuna amalga oshmadi!";
    static follow_err3 = "att: hech qanday kuzatuv ma'lumotlari topilmadi!";

    // MONGODB bilan bog'liq xatolar
    static mongo_validation_err1 = "att: mongodb tekshiruvi amalga oshmadi!";
}

module.exports = Definer;