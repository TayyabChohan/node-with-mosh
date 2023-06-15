const { General,validate } = require("../model/general");

module.exports.saveGeneral = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const general = new General({
      name: req.body.name,
    });
    const savedGeneral = await general.save();
    res.status(200).send({ result: savedGeneral });
  } catch (err) {
    res.status(500).send({ result: err.meesage });
  }
};
