const express = require("express");

const router = express.Router();
const cartController = require("../contollers/cart")
const auth = require('../middleware/validator')

router.use(auth);

router.post("/addtocart",cartController.AddToCart)
router.get("/getAllProducts",cartController.getData)
router.post("/updateCart",cartController.updateCart)
router.delete("/delete/:id",cartController.deleteCart)
router.delete("/empty",cartController.emptyCart)


module.exports = router;