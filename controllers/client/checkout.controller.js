const Product = require("../../models/product.model");
const Cart = require("../../models/cart.model");
const productsHelper = require("../../helpers/products");
const Order = require("../../models/order.model");

module.exports.index = async (req, res) => {
    const cartId = req.cookies.cartId;
    const cart = await Cart.findOne({_id: cartId});

    if(cart.products.length > 0) {

        for (const item of cart.products) {
            const productId = item.product_id;
            const productInfo = await Product.findOne({_id: productId}).select("title thumbnail slug price discountPercentage");
            

            productInfo.priceNew = productsHelper.priceNew(productInfo);

            item.productInfo = productInfo;
            item.totalPrice = productInfo.priceNew * item.quantity
        }

        cart.totalPrice = cart.products.reduce((sum, item) => sum + item.totalPrice, 0);

        console.log(cart)
    res.render("client/pages/checkout/index.pug", {
        pageTitle: "Đặt hàng",
        cartDetail: cart
    });
}};



module.exports.order = async (req, res) => {
    try {
        const cartId = req.cookies.cartId; // Lấy cartId từ cookies
        const userInfo = req.body; // Lấy thông tin user từ body request

        // Tìm cart theo cartId
        const cart = await Cart.findOne({ _id: cartId });
        if (!cart) {
            return res.status(404).send("Cart not found");
        }

        const products = []; // Mảng để lưu danh sách sản phẩm

        // Lấy thông tin từng sản phẩm trong giỏ hàng
        for (const product of cart.products) {
            const productInfo = await Product.findOne({ _id: product.product_id }).select("price discountPercentage");
            if (!productInfo) {
                return res.status(404).send(`Product with ID ${product.product_id} not found`);
            }

            // Thêm thông tin sản phẩm vào mảng products
            products.push({
                product_id: product.product_id,
                price: productInfo.price,
                discountPercentage: productInfo.discountPercentage,
                quantity: product.quantity
            });
        }

        // Tạo thông tin order
        const orderInfo = {
            cart_id: cartId,
            userInfo: userInfo,
            products: products
        };

        // Lưu order vào cơ sở dữ liệu
        const order = new Order(orderInfo);
        await order.save();

        // Xóa sản phẩm trong cart sau khi đặt hàng thành công
        await Cart.updateOne({ _id: cartId }, { products: [] });

        // Chuyển hướng đến trang checkout thành công
        res.redirect(`/checkout/success/${order.id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while processing the order");
    }
};


module.exports.success = async (req, res) => {

    // const order = await Order.findOne({_id: "681f801ccfbea4ca402ef0ce"});
    const order = await Order.findOne({_id: req.params.orderId}).populate("products.product_id");
    
    if(!order) {
        return res.status(404).send("Order not found");
    }

    for (const product of order.products) {
        const productInfo = await Product.findOne({
            _id: product.product_id 
        }).select("title thumbnail slug price discountPercentage");
    
    product.productInfo = productInfo;
    product.priceNew = productsHelper.priceNew(productInfo);
    product.totalPrice = productInfo.priceNew * product.quantity;
    }
    order.totalPrice = order.products.reduce((sum, item) => sum + item.totalPrice, 0);

    
    res.render("client/pages/checkout/success",{
        pageTitle: "Trang đặt hàng thành công",
        order: order
    } )
};
