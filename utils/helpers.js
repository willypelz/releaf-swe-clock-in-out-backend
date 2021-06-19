const config = require('../config/config');
const Sentry = require('./logger');
const fs = require('fs');

/**
 *
 * @param {object} res response object
 * @param {number} statusCode
 * @param {string} message
 * @param {*} data
 * @returns {object} res
 */
exports.successResponse = function (res, statusCode = 200, message = 'success', data = {}) {
    res.status(statusCode).json({
        status: 'success',
        message,
        data,
    });
};

/**
 *
 * @param {object} res response object
 * @param {number} statusCode
 * @param {string} message
 * @param {*} errors
 * @returns {object} res
 */
exports.errorResponse = function (res, statusCode = 404, message = 'error', errors = {}) {
    res.status(statusCode).json({
        status: 'error',
        message,
        errors,
    });
};

/**
 *
 * @param {object} res response object
 * @param {number} statusCode
 * @param {string} message
 * @param {*} errors
 * @returns {object} res
 */
exports.serverError = function (res, statusCode = 404, message = 'error', errors = null) {
    if (errors != null) {
        Sentry.captureException(errors);

    }
    exports.errorResponse(res, statusCode, message, errors);
};


/*********************************
 *  Response Code Helpers
 **********************************/
exports.responseCode = {
    SUCCESS: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOW: 405,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501
};


/*********************************
 *  Paginator helper function
 **********************************/

exports.pagination = function (paginationValue) {
    return paginationValue ? parseInt(paginationValue) : config.defaultRecordsPerPage;
};

exports.page = function (pageValue) {
    return pageValue ? parseInt(pageValue) : config.defaultPage;
};


exports.generateStaffID = (name) => {
    const randomNumber = Math.floor(Math.random() * 99999) + 10000;
    return `RE-${randomNumber}-${name.substr(0,3)}`;
}



