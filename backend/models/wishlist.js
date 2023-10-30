const mongoose = require("mongoose");

const WishlistSchema = new mongoose.Schema({
  ProductId:{
    type:mongoose.Types.ObjectId,
    required:true
  },
  UserId:{
    type:String,
    required:true
  },
  name:{
    type:String,
    required:true
  },
  subtitle: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  sizes: {
    type: Array,
    required: true,
  },
  images: {
    type: Array,
    required: true,
  },
  category: {
    type: Array,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
});

const wishlist = new mongoose.model("wishlist", WishlistSchema);

module.exports = wishlist;
