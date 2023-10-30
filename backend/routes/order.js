const express = require("express");

const router = express.Router();
const orderController = require("../contollers/order")

const auth = require('../middleware/validator')

router.use(auth);

router.get('/all',orderController.getAllOrders);

module.exports = router;