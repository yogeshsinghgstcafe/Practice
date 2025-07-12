const Joi = require("joi");
const Listing = require("../models/listing");
const validateSchema = (req, res, next) => {
  const { title, description, image, price, location, country } = req.body;

  const listingSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().allow("", null),
    price: Joi.number().required().min(0),
    location: Joi.string().required(),
    country: Joi.string().required(),
  });
  const { error, value } = listingSchema.validate({
    title,
    description,
    image,
    price,
    location,
    country,
  });
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  } else {
    next();
  }
};

const reviewSchema = (req, res, next) => {
  const { comment, rating } = req.body;
  const schema = Joi.object({
    comment: Joi.string().required(),
    rating: Joi.number().min(1).max(5).required(),
  });
  const { error, value } = schema.validate({ comment, rating });
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  } else {
    next();
  }
};

module.exports = { validateSchema, reviewSchema };
