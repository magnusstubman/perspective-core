var _ = require("underscore");

var validators = {
  required: {
    validator: function(attribute) {
      return !_.isEmpty(attribute)
    },
    message: "is required"
  }
};

var wrapError = function(errors) {
  return {errors: errors};
};

var validation = function(data, validations) {
  var validatorModule, errors = {};

  if (data === undefined) {
    return wrapError("No data provided");
  }

  _.each(validations, function(fieldValue, fieldName) {
    _.each(fieldValue, function(validationValue, validationKey) {
      validatorModule = validators[validationKey];
      fieldValue = data[fieldName];
      if (!validatorModule.validator(fieldValue)) {
        errors[fieldName] = validatorModule.message;
      }
    });
  });

  if (!_.isEmpty(errors)) {
    return wrapError(errors);
  }
};

module.exports = validation;