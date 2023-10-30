const Cart = require("../models/cart");

const AddToCart = async (req, res) => {
  const {
    name,
    subtitle,
    price,
    // selectedQuantityPrice,
    selectedSize,
    desc,
    sizes,
    images,
    category,
    thumbnail,
    _id,
  } = req.body;

  const {userId} = res.locals.userData
  const product = await Cart.findOne({ ProductId: _id });
  if (product) {
    try {
      const newQuantity = product.Quantity + 1;
      const updatedCart = await Cart.updateOne(
        { ProductId: _id },
        {
          $set: {
            Quantity: newQuantity,
            selectedQuantityPrice: newQuantity * product.price,
          },
        }
      );
      if (updatedCart.matchedCount === 1) {
        return res
          .status(201)
          .json({ message: "Cart updated successfully..." });
      } else {
        return res.status(400).json({ message: "Cart not updated" });
      }
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  }
  try {
    const newCart = new Cart({
      ProductId: _id,
      Quantity: 1,
      UserId: userId,
      name,
      subtitle,
      price,
      selectedQuantityPrice: price,
      selectedSize,
      desc,
      sizes,
      images,
      category,
      thumbnail,
    });
    await newCart.save();
    return res.status(200).json({ message: "New item added to cart" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getData = async (req, res) => {
  const {userId} = res.locals.userData
  try {
    const cartData = await Cart.find({UserId:userId});
    if (cartData) {
      return res.status(200).json({ data: cartData });
    } else {
      return res
        .status(404)
        .json({ message: "Could not find any items in cart" });
    }
  } catch (err) {
    return res.status(400), json({ message: err.message });
  }
};

const updateCart = async (req, res) => {
  const { id, key, val } = req.body;
  const {userId} = res.locals.userData

  console.log(key + ":" + val)
  try {
    const cartProd = await Cart.findOne({ ProductId: id, UserId:userId });
    if (cartProd) {
      let update;
      if(key === "Quantity"){
        update = await Cart.updateOne(
          { ProductId: id },
          {
            $set: {
              Quantity: val,
              selectedQuantityPrice: val * cartProd.price,
            },
          }
        );
      }else{
        update = await Cart.updateOne(
          { ProductId: id },
          {
            $set: {
              selectedSize: val,
            },
          }
        );
      }
      if (update.matchedCount === 1) {
        return res.status(200).json({ message: "Updated the required field" });
      } else {
        return res
          .status(200)
          .json({ message: "Cannot update the required field" });
      }
    } else {
      return res.status(404).json({ message: "Cannot find the product" });
    }
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const deleteCart = async (req,res)=>{
  const {id} = req.params;
  const {userId} = res.locals.userData

  console.log(id)
  try{
    const deletedProduct = await Cart.deleteOne({ProductId : id, UserId: userId});
    if(deletedProduct.deletedCount){
      return res.status(200).json({message : 'Deleted Successfully'})
    }else{
      return res.status(404).json({message : 'No such item found in your cart.'})
    }
  }catch(err){
    return res.status(500).json({err : err.message})
  }
}

const emptyCart = async(req,res)=>{
  const {userId} = res.locals.userData
  try{
    const deletedItems = await Cart.deleteMany({UserId:userId});
    if(deletedItems.deletedCount){
      return res.status(200).json({message : 'Your cart is now Empty!'})
    }
  }catch(err){
    return res.status(500).json({err : err.message})
  }
}

exports.AddToCart = AddToCart;
exports.getData = getData;
exports.updateCart = updateCart;
exports.deleteCart = deleteCart;
exports.emptyCart = emptyCart;
