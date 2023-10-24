const Product = require("../models/Product");
const assert = require("assert");
const Definer = require("../lib/mistake");

let productController = module.exports;


productController.getAllProducts = async (req, res) => {
    try{
        console.log('GET: getAllProductsga kimdir kirdi!');
    } catch(err) {
        console.log(`ERROR: getAllProductsga kirishda xatolik boldi! ${err.message}`);
        res.json({state: 'neudachno!', message: err.message});
    }
};

productController.addNewProduct = async (req, res) => {
    try{
        console.log('POST: addNewProductga kimdir kirdi!');

        assert(req.files, Definer.general_err3);

        const product = new Product();
        let data = req.body;

        data.product_images = req.files.map((ele) => {
            return ele.path;
        });
        console.log("Controller DATA::::", data)

        const result = await product.addNewProductData(data, req.member);

        const html =`<script>
                        alert(yangi taom muvaffaqiyatli qo'shildi);
                        window.location.replace('/resto/products/menu');
                    </script>`
        res.end(html);

    } catch(err) {
        console.log(`ERROR: addNewProductga kirishda xatolik boldi! ${err.message}`);

    }
};

productController.updateChosenProduct = async (req, res) => {
    try{
        console.log('POST: updateChosenProductga kimdir kirdi!');
        const product = new Product();
        const id = req.params.id;
        const result = await product.updateChosenProductData(id, req.body, req.member._id);

        await res.json({state: 'muvaffaqiyatli', data: result});
    } catch(err) {
        console.log(`ERROR: updateChosenProductga kirishda xatolik boldi! ${err.message}`);

    }
};