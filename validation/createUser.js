const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCreateUserInput(data) {
    let errors = {};

    data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
    data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
    data.phone = !isEmpty(data.phone) ? data.phone : '';
    data.userType = !isEmpty(data.userType) ? data.userType : '';
    data.status = !isEmpty(data.status) ? data.status : '';


    if (!Validator.isLength(data.firstName, {
            min: 2,
            max: 50
        })) {
        errors.firstName = 'First name must be between 2 and 50 characters';
    }

    if (Validator.isEmpty(data.firstName)) {
        errors.firstName = 'First name is required';
    }
    if (Validator.isEmpty(data.lastName)) {
        errors.lastName = 'Last name is required';
    }
    if (Validator.isEmpty(data.phone)) {
        errors.phone = 'Phone is required';
    }
    if (Validator.isEmpty(data.userType)) {
        errors.userType = 'User type is required';
    }
    if (Validator.isEmpty(data.status)) {
        errors.status = 'Status is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}