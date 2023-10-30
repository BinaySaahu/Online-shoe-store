
const Order = require('../models/order')
const Product = require('../models/products')
const getAllOrders = async(req,res)=>{
    const {userId} = res.locals.userData;
    console.log(userId)
    try{
        const orders = await Order.find({userId:userId});
        // if(orders){
        //     orders.map(async (order) => {
        //         const o = await Product.findOne({ProductId: order.ProductId});
                
        //     });
        // }
        const orderDet = await Promise.all(orders.map(async (order) => {
            const obj = await Promise.all(order.Products.map(async (product) => {
                const prod = await Product.findOne({ _id: product.ProductId });
                return {
                    image: prod.thumbnail,
                    name: prod.name,
                    price: prod.price,
                    Quantity: product.Quantity,
                    size:product.Size
                };
            }));
            return {
                OrderId: order._id,
                totalAmount: order.totalAmount,
                products: obj
            };
        }));
        console.log("Order details->",orderDet);
        return res.status(200).json({orders:orderDet});
    }
    catch(err){
        return res.status(500).json({err:err.message});
    }


}


exports.getAllOrders = getAllOrders;
