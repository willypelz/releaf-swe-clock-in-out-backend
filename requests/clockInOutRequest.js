const Joi = require('joi');

const FormValidator = require( '../utils/formValidator')

/**
 * addMemberRequest
 *
 * @type {FormValidator}
 */
const clockInOutRequest = new FormValidator({
    staff_id: Joi
        .string()
        .required(),
    status: Joi
        .string()
        .required(),

});

module.exports = clockInOutRequest;
