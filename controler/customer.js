const { Customer } = require("../model/customer");
module.exports.saveCustomer = async (req, res) => {
  try {
    const { customerName, phone, isGold } = req.body;
    if (!customerName) res.status(400).send({ result: "Customer is required" });
    const customerInfo = new Customer({
      customerName: customerName,
      phone: phone,
      isGold: isGold,
    });
    const savedCustomer = await customerInfo.save();
    res.status(201).send({ result: savedCustomer });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
