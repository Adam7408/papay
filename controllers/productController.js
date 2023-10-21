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
        // console.log(req.member);

        // TODO: product create develop

        res.send("ok");

    } catch(err) {
        console.log(`ERROR: addNewProductga kirishda xatolik boldi! ${err.message}`);

    }
};

productController.updateChosenProduct = async (req, res) => {
    try{
        console.log('POST: updateChosenProductga kimdir kirdi!');
    } catch(err) {
        console.log(`ERROR: updateChosenProductga kirishda xatolik boldi! ${err.message}`);

    }
};





