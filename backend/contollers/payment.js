require("dotenv").config()

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/order')

const payment = async (req, res) => {
  const { products } = req.body;
  const {userId} = res.locals.userData;
  const items = products.map((product)=>{
    return {
        price_data: {
          currency: "inr",
          product_data: {
            name: product.name,
          },
          unit_amount: Math.round(product.price * 100),
        },
        quantity: product.Quantity,
      };

  })
  console.log(products);
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items,
      mode: "payment",
      success_url: `${process.env.BASE_URL}/success`,
      cancel_url: `${process.env.BASE_URL}/cancel`,
    });

    console.log(session);
    if(session){
        const p = products.map((product)=>{
            return {
                ProductId: product.ProductId,
                Size: product.selectedSize,
                Quantity: product.Quantity
            }
        })
        try{
            const newOrder = new Order({
                userId : userId,
                Products: p,
                totalAmount: products.subtotal
            })
            await newOrder.save()
            return res.status(200).json({ id: session.id });
        }catch(err){
            return res.status(500).json({err:err.message})
        }
    }
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

exports.payment = payment;
