const { Rental, validate } = require("../model/rental");
const { Customer } = require("../model/customer");
const { Movie } = require("../model/movies");
module.exports.getRentalList = async (req, res) => {
  try {
    const rentalList = await Rental.find();
    res.status(200).send({ result: rentalList });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
module.exports.postRentalPros = async (req, res) => {
  try {
  // console.log(req.body.customerId, "tayyayayyab");
  const { error } = validate(req.body);
  if (error) res.status(400).send(error.details[0].message);
  const customer = await Customer.findById(req.body.customerId);
  // console.log(customer, "customer");
  if (!customer) res.status(400).send({ result: "Invalid Customer" });
  const movie = await Movie.findById(req.body.movieId);
  // console.log(movie, "movie");
  if (!movie) res.status(400).send({ result: "Invalid Movie" });
  const rental = new Rental({
    customer: {
      _id: req.body.customerId,
      phone: customer.phone,
      customerName: customer.customerName,
      isGold: customer.isGold,
    },
    movie: {
      _id: req.body.movieId,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
      numberInstock:movie.numberInstock
    },
  });
  const savedMovie = await rental.save();
  res.status(201).send({ result: savedMovie });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
