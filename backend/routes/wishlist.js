const express = require("express");

const router = express.Router();
const wishlistController = require("../contollers/wishlist")

const auth = require('../middleware/validator')

router.use(auth);

router.post("/addtowishlist",wishlistController.AddToWishlist)

router.get("/getAllproducts",wishlistController.getWishlistData)
router.delete("/delete/:_id",wishlistController.DeleteWishlistData)


module.exports = router;