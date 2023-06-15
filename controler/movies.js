const { Movie, validate } = require("../model/movies");
const { General } = require("../model/general");
module.exports.saveMovie = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const general = await General.findById(req.body.generalId);
    if (!general) return res.status(400).send("Invalid General");
    const movie = new Movie({
      title: req.body.title,
      generalId: {
        _id: general._id,
        name: general.name,
      },
      numberInstock: req.body.numberInstock,
      dailyRentalRate: req.body.dailyRentalRate,
    });
    const savedMove = await movie.save();
    res.status(200).send({ result: savedMove });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
