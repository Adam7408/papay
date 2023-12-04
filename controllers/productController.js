const Product = require("../models/Product");
const assert = require("assert");
const Definer = require("../lib/mistake");

let productController = module.exports;

productController.getAllProducts = async (req, res) => {
    try {
        console.log("POST: Restaurantning barcha productlari!");
        const product = new Product();
        const results = await product.getAllProductsData(req.member, req.body);

        res.json({ state: "success", data: results });
    } catch (err) {
        console.log(`ERORR: getAllProducts, ${err.message}`);

        const error = `<script>alert("Something went wrong!")</script>`;
        res.end(error);
    }
};

productController.getChosenProduct = async (req, res) => {
    try {
        console.log("GET: Bir product tanlandi!");

        const id = req.params.id;
        const product = new Product();
        const result = await product.getChosenProductData(req.member, id);

        res.json({ state: "success", data: result });
    } catch (err) {
        console.log(`ERORR: Product tanlashda xatolik bo'ldi!, ${err.message}`);

        const error = `<script>alert("Something went wrong!")</script>`;
        res.end(error);
    }
};

/*************************************************
 *             BSSR RELATED METHODS              *
 *************************************************/

productController.addNewProduct = async (req, res) => {
    try {
        console.log("POST: addNewProductga kimdir kirdi!");

        assert.ok(req.files, Definer.general_err3);

        const product = new Product();
        let data = req.body;

        data.product_images = req.files.map((ele) => {
            return ele.path;
        });
        console.log("Controller DATA::::", data);

        const result = await product.addNewProductData(data, req.member);

        const html = `<script>
                        alert("yangi taom muvaffaqiyatli qo'shildi");
                        window.location.replace('/resto/products/menu');
                    </script>`;
        res.end(html);
    } catch (err) {
        console.log(
            `ERROR: addNewProductga kirishda xatolik boldi! ${err.message}`
        );
    }
};

productController.updateChosenProduct = async (req, res) => {
    try {
        console.log("POST: Product o'zgarmoqda!");
        const product = new Product();
        const id = req.params.id;
        const result = await product.updateChosenProductData(
            id,
            req.body,
            req.member._id
        );

        await res.json({ state: "muvaffaqiyatli", data: result });
    } catch (err) {
        console.log(
            `ERROR: Product o'zgartirishda xatolik boldi! ${err.message}`
        );

        res.json({
            state: "fail",
            message:
                "Product o'zgartirishda xatolik bo'ldi! (updateChosenProduct)",
        });
    }
};
