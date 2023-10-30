const Wishlist = require("../models/wishlist");

const AddToWishlist = async (req, res) => {
  const {userId} = res.locals.userData
  const {
    ProductId,
    name,
    subtitle,
    price,
    desc,
    sizes,
    images,
    category,
    thumbnail,
  } = req.body;
  const wishlist = await Wishlist.findOne({ ProductId: ProductId });
  if (wishlist) {
    try {
      return res
        .status(201)
        .json({ message: "Item already exists in your wishlist" });
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  }
  try {
    const newWishlist = new Wishlist({
      ProductId,
      UserId: userId,
      name,
      subtitle,
      price,
      desc,
      sizes,
      images,
      category,
      thumbnail,
    });
    const createdWishlist = await newWishlist.save();
    return res.status(200).json({ message: "New item added to Wishlist" });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

const DeleteWishlistData = async (req, res) => {
  const _id = req.params._id;
  const {userId} = res.locals.userData
  console.log(_id);
  try {
    const wishlist = await Wishlist.deleteOne({_id:_id,UserId:userId});
    console.log(wishlist)
    if (wishlist) {
      return res.status(200).json({ wishlistItems: wishlist });
    } else {
      return res.status(404).json({ message: "Cannot delete" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
};

const getWishlistData = async (req, res) => {
  const {userId} = res.locals.userData
  try {
    const wishlist = await Wishlist.find({UserId: userId});
    if (wishlist) {
      return res.status(200).json({ wishlistItems: wishlist });
    } else {
      return res.status(404).json({ message: "Not item in wishlist" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
};


exports.AddToWishlist = AddToWishlist;
exports.getWishlistData = getWishlistData;
exports.DeleteWishlistData = DeleteWishlistData;
