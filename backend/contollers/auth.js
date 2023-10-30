const User = require("../models/user");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const WishlistList = require("../models/wishList");
const Cart = require("../models/cart");

const registerController = async (req, res) => {
  const { Username, Password, Email, Gender, Country, DateOfBirth } = req.body;

  const user = await User.findOne({ Email: Email });
  if (user) {
    return res.status(400).json({ message: "User already exists", code: 1 });
  } else {
    const User_id = uuidv4();
    const hashedPass = await bcrypt.hash(Password, 10);
    var url = gravatar.url(Email,{ s: "200", r: "pg", d: "mm" },true)
    try {
      if (Email.includes("@") && Email.includes(".")) {
        const newUser = new User({
          User_id,
          Username,
          Password: hashedPass,
          Email,
          Gender,
          DateOfBirth,
          Country,
          Image:url
        });
        const createdUser = await newUser.save();
        console.log(createdUser);

        try {
          const token = jwt.sign(
            {
              userId: createdUser.User_id,
              email: createdUser.Email,
            },
            process.env.ACCESS_TOKEN,
            { expiresIn: "86400s" }
          );
          const wishlist = await WishlistList.find({UserId: User_id});
          const cart = await Cart.find({UserId: User_id})
          return res.status(200).json({
            message: "User created successfully",
            secrete_token: token,
            user: createdUser,
            wishlistItems:wishlist,
            cartItems:cart
          });
        } catch (err) {
          return res.status(500).json({ error: err });
        }
      } else {
        return res.status(401).json({ message: "Invalid email", code: 2 });
      }
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  }
};

const loginController = async (req, res) => {
  const { Password, Email } = req.body;

  if (Email.includes("@") && Email.includes(".")) {
    const user = await User.findOne({ Email: Email });

    if (user) {
      const correctPassword = await bcrypt.compare(Password, user.Password);
      try {
        if (correctPassword) {
          const token = jwt.sign(
            {
              userId: user.User_id,
              email: Email,
            },
            process.env.ACCESS_TOKEN,
            { expiresIn: "86400s" }
          );
          const wishlist = await WishlistList.find({UserId: user.User_id});
          const cart = await Cart.find({UserId: user.User_id})
          return res.status(200).json({
            message: "User logged in successfully",
            secrete_token: token,
            user: user,
            wishlistItems:wishlist,
            cartItems:cart
          });
          
        } else {
          return res.status(400).json({ message: "Invalid password", code: 4 });
        }
      } catch (err) {
        return res.status(500).json({ error: err.message });
      }
    } else {
      return res.status(400).json({ message: "User does not exists", code: 3 });
    }
  } else {
    return res.status(401).json({ message: "Invalid email", code: 2 });
  }
};

exports.loginController = loginController;

exports.registerController = registerController;
