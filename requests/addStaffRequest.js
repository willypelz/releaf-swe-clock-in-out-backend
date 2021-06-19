const Joi = require('joi');

const FormValidator = require( '../utils/formValidator')

/**
 * addMemberRequest
 *
 * @type {FormValidator}
 */
const addStaffRequest = new FormValidator({

    name: Joi
        .string()
        .required(),
    email: Joi
        .string()
        .required(),
    phone_number: Joi
        .string()
        .required(),
    department: Joi
        .string()
        .required(),
    address: Joi
        .string()
        .required(),

});

module.exports = addStaffRequest;
