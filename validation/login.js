const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
    let errors = {};


    data.phone = !isEmpty(data.phone) ? data.phone : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if (Validator.isEmpty(data.phone)) {
        errors.phone = 'Phone is required';
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}