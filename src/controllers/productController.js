const Product = require("../models/Product");

const getProducts = async (req, res) => {

    try {

        const result =
await Product.getProducts(req.query);

res.json({
    success: true,
    count: result.products.length,
    data: result.products,
    nextCursor: result.nextCursor
});

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    getProducts
};