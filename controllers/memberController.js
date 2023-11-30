let memberController = module.exports;

const Member = require("../models/Member");
const jwt = require('jsonwebtoken');
const assert = require('assert');
const Definer = require('../lib/mistake');

memberController.signup = async (req, res) => { 
    try{ 
        console.log('POST: Kimdir SIGNUP qildi!');
        const data = req.body; 

        const member = new Member(); 
        const new_member = await member.signupData(data); 

        const token = memberController.createToken(new_member);
		res.cookie('access_token', token, {
			maxAge: 6 * 3600 * 1000,
			httpOnly: false,
		});

        res.json({state: 'muvaffaqiyatli', data: new_member});
    } catch(err){ 
        console.log(`ERROR: SIGNUP qilishda xatolik boldi! ${err.message}`); 
        res.json({state: 'muvaffaqiyatsiz', message: err.message}); 
    }
};

memberController.login = async (req, res) => {
    try{
        console.log('POST: Kimdir LOGIN qildi!');
        const data = req.body; 

        const member = new Member();
        const result = await member.loginData(data);

        const token = memberController.createToken(result);
        // console.log("TOKEN:::", token);
        res.cookie('access_token', token, {
			maxAge: 6 * 3600 * 1000,
			httpOnly: false,
		});

        res.json({state: 'muvaffaqiyatli', data: result});
    } catch(err){
        console.log(`ERROR: LOGIN qilishda xatolik boldi! ${err.message}`);
        res.json({state: 'muvaffaqiyatsiz', message: err.message});
    }
}

memberController.logout = (req, res) => {
    console.log('POST: Kimdir LOGOUT qildi!');
    res.send("Logout bo'ldingiz");
}

memberController.createToken = (result) => {
	try {
		const upload_data = {
			_id: result._id,
			mb_nick: result.mb_nick,
			mb_type: result.mb_type
		};

		const token = jwt.sign(upload_data, process.env.SECRET_TOKEN, { expiresIn: '6h' });

		assert.ok(token, Definer.auth_err2);
		return token;
	} catch (err) {
		throw err;
	}
};

memberController.checkMyAuthentication = (req, res) => {
	try {
		console.log('GET: CheckAuthentication');

		let token = req.cookies['access_token'];
		// console.log("token:::", token);

		const member = token ? jwt.verify(token, process.env.SECRET_TOKEN) : null;
		assert.ok(member, Definer.auth_err2);

		res.json({ state: 'Muvaffaqiyatli', data: member });
	} catch (err) {
		throw err;
	}
};