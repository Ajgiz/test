const joi = require("joi");

exports.contactValidation = (data) => {
  const schema = joi.object({
    username: joi.string().min(4).max(36).required(),
    phone: joi.string().min(11).max(11).required(),
  });
  return schema.validate(data)
};
