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
        console.log("req.BODY:::", req.body);

        const community = new Community();
        const result = await community.createArticleData(req.member, req.body);
        assert.ok(result, Definer.general_err1);

        res.json({state: 'Muvaffaqiyatli', data: result});
    } catch(err) {
        console.log(`ERROR: article yasashda xatolik bo'ldi!, ${err.message}`); 
        res.json({state: 'muvaffaqiyatsiz', message: err.message});
    }
};

communityController.getMemberArticles = async (req, res) => {
    try{
        console.log("GET: User boshqa bir userning article pagesiga ko'rmoqda!");

        const mb_id = req.query.mb_id !== 'none' 
            ? req.query.mb_id 
            : req.member._id; // Authentication bo'lgan userning _idsi
        assert.ok(mb_id, Definer.article_err1);

        // console.log("mb_id:::", mb_id);
        // console.log("QUERY:::", req.query.mb_id);
        
        const community = new Community();
        const result = await community.getMemberArticlesData(req.member, mb_id, req.query);

        res.json({state: 'Muvaffaqiyatli', data: result});
    } catch(err) {
        console.log(`ERROR: article pagega kirishda xatolik bo'ldi!, ${err.message}`); 
        res.json({state: 'muvaffaqiyatsiz', message: err.message});
    }
};

communityController.getArticles = async (req, res) => {
    try{
        console.log("GET: User community pagega kirdi!");
        // console.log("QUERY:::", req.query);

        const community = new Community();
        const result = await community.getArticlesData(req.member, req.query);
        
        res.json({state: 'Muvaffaqiyatli', data: result});
    } catch(err) {
        console.log(`ERROR: Community pagega kirishda xatolik bo'ldi, ${err.message}`); 
        res.json({state: 'muvaffaqiyatsiz', message: err.message});
    }
};

communityController.getChosenArticle = async (req, res) => {
    try{
        console.log("GET: User bir articleni tanladi!");

        const art_id = req.params.art_id;
        // console.log("ART_ID:::", art_id);
        // console.log("req.PARAMS:::",  req.params);

        const community = new Community();
        const result = await community.getChosenArticleData(req.member, art_id);

        res.json({state: 'Muvaffaqiyatli', data: result});
    } catch(err) {
        console.log(`ERROR: article tanlashda xatolik bo'ldi!, ${err.message}`); 
        res.json({state: 'muvaffaqiyatsiz', message: err.message});
    }
}