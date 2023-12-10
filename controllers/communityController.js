const assert = require("assert");
const Definer = require("../lib/mistake");
const Community = require("../models/Community");

let communityController = module.exports;

communityController.imageInsertion = async (req, res) => {
    try{
        console.log("POST: User community image post qilmoqda!");

        assert.ok(req.file, Definer.general_err3);
        const image_url = req.file.path;

        console.log("REQ.FILE", req.file);
        console.log("image_URL", req.file.path);


        res.json({state: 'Muvaffaqiyatli', data: image_url});
    } catch(err) {
        console.log(`ERROR: Image post qilishda xatolik bo'ldi!, ${err.message}`); 
        res.json({state: 'muvaffaqiyatsiz', message: err.message});
    }
};

communityController.createArticle = async (req, res) => {
    try{
        console.log("POST: User article yasamoqda!");
        // console.log("req.BODY:::", req.body);

        const community = new Community();
        const result = await community.createArticleData(req.member, req.body);
        assert.ok(result, Definer.general_err1);

        res.json({state: 'Muvaffaqiyatli', data: result});
    } catch(err) {
        console.log(`ERROR: article yasashda xatolik bo'ldi!, ${err.message}`); 
        res.json({state: 'muvaffaqiyatsiz', message: err.message});
    }
}


