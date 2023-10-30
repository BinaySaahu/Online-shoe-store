const express = require("express");

const router = express.Router();
const paymentController = require("../contollers/payment")

const auth = require('../middleware/validator')

router.use(auth);

router.post("/payment",paymentController.payment)

module.exports = router;