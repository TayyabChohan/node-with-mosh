const mongoose = require("mongoose");
const customerSchema = mongoose.Schema({
  customerName: {
    type: String,
    required: true,
    minlength: 5,
    maxlenth: 255,
  },
  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlenth: 255,
  },
  isGold: {
    type: Boolean,
    default: false,
  },
});
const Customer = mongoose.model("Customer", customerSchema);

exports.Customer = Customer;
exports.customerSchema = customerSchema;
