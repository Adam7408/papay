const Product = require("../models/Product");
const Member = require("../models/Member");
const Definer = require("../lib/mistake");
const assert = require("assert");

let restaurantController = module.exports; 

restaurantController.getRestaurants = async (req, res) => {
	try {
		console.log('GET: getRestaurantsga kimdir kirdi');
		const data = req.query,
			restaurant = new Restaurant(),
			result = await restaurant.getRestaurantsData(req.member, data);
		res.json({ state: 'muvaffaqiyatli', data: result });
	} catch (err) {
		console.log(`ERROR: getRestaurantsga kirishda xatolik bor, ${err.message}`);
		res.json({ state: 'muvaffaqiyatsiz', message: err.message });
	}
};

restaurantController.getChosenRestaurant = async (req, res) => {
	try {
		console.log("GET: Admin restaurantni o'zgartirmoqda");
		const id = req.params.id,
			restaurant = new Restaurant(),
			result = await restaurant.getChosenRestaurantData(req.member, id);

		res.json({ state: 'muvaffaqiyatli', data: result });
	} catch (err) {
		console.log(`ERROR: restaurantni o'zgartirishda xatolik bor, ${err.message}`);
		res.json({ state: 'fail', message: err.message });
	}
};

//================================================= GET ===============================================================
restaurantController.home = (req, res) => {
    try{
        console.log("GET: home pagega kimdir kirdi");

        res.render("home-page");
    } catch(err) {
        console.log(`ERROR: home pagega kirishda xatolik boldi! ${err.message}`);
        res.json({state: 'muvaffaqiyatsiz!', message: err.message});
    }
}

//================================================= GET ===============================================================
restaurantController.getMyRestaurantProducts = async (req, res) => { 
    try{
        console.log('GET: restaurant-menuga kimdir kirdi!'); 

        const product = new Product();
        const data = await product.getAllProductsDataResto(req.member);

        res.render("restaurant-menu", { restaurant_data: data });
    } catch(err){
        console.log(`ERROR: restaurant-menuga kirishda xatolik boldi! ${err.message}`);
        res.redirect('/resto');
    }
}

//================================================= GET ===============================================================
restaurantController.getSingupMyRestaurant = async (req, res) => { 
    try{
        console.log('GET: signup pagega kimdir kirdi!'); 

        res.render('signup'); 
    } catch(err){
        console.log(`ERROR: signup pagega kirishda xatolik boldi! ${err.message}`);
        res.json({state: 'muvaffaqiyatsiz!', message: err.message});
    }
}

//================================================= POST ===============================================================
restaurantController.signupProcess = async (req, res) => {
    try{
        console.log('POST: kimdir signup qilmoqda'); 

        assert.ok(req.file, Definer.general_err3);

        console.log("req.file", req.file);
        console.log("req.body", req.body);
        
        let new_member = req.body; 
        new_member.mb_type = "RESTAURANT";
        new_member.mb_image = req.file.path;


        const member = new Member();
        const result = await member.signupData(new_member);

        assert.ok(result, Definer.general_err1);

        // SESSION
        req.session.member = result; 

        res.redirect("/resto/products/menu"); 
    } catch(err){
        console.log(`ERROR: signup qilishda xatolik boldi! ${err.message}`);
        res.json({state: 'muvaffaqiyatsiz!', message: err.message});
    }
};

//============================================== GET ===============================================================
restaurantController.getLoginMyRestaurant = async (req, res) => {
    try{
        console.log('GET: login pagega kimdir kirdi!');

        res.render('login-page'); 
    } catch(err){
        console.log(`ERROR: login pagega kirishda xatolik boldi! ${err.message}`);
        res.json({state: 'muvaffaqiyatsiz!', message: err.message});
    }
}

//============================================== POST ===============================================================
restaurantController.loginProcess = async (req, res) => {
    try{
        console.log('POST: kimdir login qilmoqda'); 
        
        const data = req.body; 

        const member = new Member();
        const result = await member.loginData(data);

        // SESSION 
        req.session.member = result; 
        
        req.session.save(function() { 
            result.mb_type === 'ADMIN' 
            ? res.redirect("/resto/all-restaurant") 
            : res.redirect("/resto/products/menu"); 
        });

    } catch(err){
        console.log(`ERROR: login qilishda xatolik boldi! ${err.message}`);
        res.json({state: 'muvaffaqiyatsiz!', message: err.message});
    }
}

//============================================== GET ===============================================================
restaurantController.logout = (req, res) => {
    try{
        console.log("GET: kimdir logout qilmoqda");

        req.session.destroy(function() {
            res.redirect("/resto");
        })

    } catch(err) {
        console.log(`ERROR: logout qilishda xatolik boldi! ${err.message}`);
        res.json({state: 'muvaffaqiyatsiz!', message: err.message});
    }
}

//============================================== POST ===============================================================
restaurantController.validateAuthRestaurant = (req, res, next) => {
    if(req.session?.member?.mb_type === "RESTAURANT") {
        req.member = req.session.member;
        next();
    } else 
    res.json({
        state: "muvaffaqiyatsiz!", 
        message: "faqat RESTAURANT typedagi user bo'lishi kerak!"
    });
};

//============================================== GET ===============================================================
restaurantController.checkSessions = (req, res) => {
    if(req.session?.member){
        res.json({state: 'muvaffaqiyatli', data: req.session.member});
    } else{
        res.json({state: 'muvaffaqiyatsiz!', message: "Siz tasdiqlanmagansiz!"});
    }
};

restaurantController.validateAdmin = (req, res, next) => {
	if (req.session?.member?.mb_type === 'ADMIN') {
		req.member = req.session.member;
		next();
	} else {
		const html = `<script>
                        alert('Admin page: Permission denied');
                        window.location.replace('/resto');
                    <script>`;
                    
		res.end(html);
	}
};

restaurantController.getAllRestaurants = async (req, res) => {
	try {
		console.log('GET Admin - all-restaurant pagega kirmoqda');

		const restaurant = new Restaurant();
		const restaurants_data = await restaurant.getAllRestaurantsData();
		console.log( "restaurants_data:", restaurants_data );
		res.render('all-restaurant', { restaurants_data: restaurants_data });
	} catch (err) {
		console.log(`ERROR: all-restaurant pagega kirishda xatolik bor, ${err.message}`);
		res.json({ state: 'muvaffaqiyatsiz!', message: err.message });
	}
};

restaurantController.updateRestaurantByAdmin = async (req, res) => {
	try {
		console.log("GET: Admin restaurantni o'zgartirmoqda");
        console.log("req.body::: ", req.body);

		const restaurant = new Restaurant();
		const result = await restaurant.updateRestaurantByAdminData(req.body);
        

		await res.json({ state: 'muvaffaqiyatli', data: result });

        console.log("result::: ", result);
	} catch (err) {
		console.log(`ERROR: o'zgartirishda xatolik bor, ${err.message}`);
		res.json({ state: 'muvaffaqiyatsiz!', message: err.message });
	}
};