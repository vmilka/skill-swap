const createError = require("http-errors");
const Rating = require("../models/rating.model");

module.exports.list = (req, res, next) => {
  const user = req.params.id;

  Rating.find({ ratedUser: user })
    .populate('reviewer')
    .then((rating) => {

      const response = Array.from(
        new Map(rating.map(rt => [rt.reviewer.id, {
          author: rt.reviewer.name,
          text: rt.comment,
          rating: rt.rating,
          authorId: rt.reviewer.id
        }])).values());

      res.json(response)

    })
    .catch((error) => next(error));
};



module.exports.create = (req, res, next) => {

  const rating = req.body;
  rating.reviewer = req.user

  console.log(rating)

  Rating.create(rating)
    .then((rating) => res.status(201).json(rating))
    .catch((error) => next(error));
};

 
 