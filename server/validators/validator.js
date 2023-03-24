const Joi = require("joi");

const validation = Joi.object({
  blog_title: Joi.string().min(2).max(30).trim().required(),
  description: Joi.string().max(500).trim(),
  name: Joi.string().min(2).max(30).trim().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "fr"] } })
    .trim()
    .required(),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .trim()
    .required(),
  blog_logo: Joi.string()
    .pattern(new RegExp(/.(jpg|jpeg|png|gif)$/i))
    .required(),
});

module.exports = validation;
