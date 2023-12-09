const assert = require("assert");
const Order = require("../models/Order");
const Definer = require("../lib/mistake");

let orderController = module.exports;

orderController.createOrder = async (req, res) => { 
    try{ 
        console.log('POST: User buyurtma qilmoqda!');

		assert.ok(req.member, Definer.auth_err5);
        // console.log("REQ.BODY:::", req.body);

		const order = new Order();
		const result = await order.createOrderData(req.member, req.body);

        res.json({state: 'Muvaffaqiyatli', data: result});
    } catch(err){ 
        console.log(`ERROR: Buyurtma qilishda xatolik bo'ldi! ${err.message}`); 
        res.json({state: 'muvaffaqiyatsiz', message: err.message}); 
    }
};

orderController.getMyOrders = async (req, res) => {
    try{
        console.log('GET: User order pagega kirdi!');

        assert.ok(req.member, Definer.auth_err5);
        // console.log("MEMBER:::", req.member);
        console.log("QUERY:::", req.query);

        const order = new Order();
        const result = await order.getMyOrdersData(req.member, req.query);

        res.json({state: 'Muvaffaqiyatli', data: result});
    } catch(err) {
        console.log(`ERROR: Order pagega kirishda xatolik bo'ldi!, ${err.message}`); 
        res.json({state: 'muvaffaqiyatsiz', message: err.message});
    }
}