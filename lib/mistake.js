class Definer {
    // bu ERRORlarni ko'p joyda ishlatkanimiz uchun - alohida filega solib oldik, keragini olib ishlataveramiz

    static general_err1 = "att: nimadir xato bo'ldi!";
    static general_err2 = "att: bunaqa parameterdagi data yo'q!";
    static general_err3 = "att: file upload qilishda xatolik bo'ldi!";

    static auth_err1 = "att: mongoDB tekshiruvi amalga oshmadi!";
    static auth_err3 = "att: bu nicknamedagi user yo'q!";
    static auth_err4 = "att: hisob ma'lumotlariz to'g'ri kelmayapti!";

    static product_err1 = "att: product hosil qilishda xatolik bo'ldi!";

}

// Definer classni export qilamiz
module.exports = Definer;