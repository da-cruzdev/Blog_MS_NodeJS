const Joi = require("joi");

const postValidator = Joi.object({
  title: Joi.string().min(2).max(30).trim().required(),
  content: Joi.string().max(500).trim(),
  image: Joi.string().allow("", ""),
});

module.exports = postValidator;
