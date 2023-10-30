const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
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

const ProductList = new mongoose.model("Products", ProductSchema);

module.exports = ProductList;
