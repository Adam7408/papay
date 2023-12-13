const assert = require('assert');
const Definer = require('../lib/mistake');
const Follow = require('../models/Follow');

let followController = module.exports;

followController.subscribe = async (req, res) => {
    try{
        console.log("POST: Kimdir subscribe qilmoqda!");
        // console.log("REQ.BODY:::", req.body);

        assert.ok(req.member, Definer.auth_err5);

        const follow = new Follow();
        const result = await follow.subscribeData(req.member, req.body);

        res.json({state: 'Muvaffaqiyatli', data: result});
    } catch(err) {
        console.log(`ERROR: Subscribe qilishda xatolik bo'ldi, ${err.message}`); 
        res.json({state: 'muvaffaqiyatsiz', message: err.message});
    }
}