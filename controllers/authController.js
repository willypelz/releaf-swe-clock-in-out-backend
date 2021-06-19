const {successResponse, errorResponse, responseCode, serverError} = require('../utils/helpers');

/**
 *
 *
 * @api {post} /staff/auth/login Admin Login
 * @apiName AdminLogin
 * @apiGroup Admin Auth
 * @apiVersion  0.1.0
 *
 * @apiParam  {String} email Admin Admin Email
 * @apiParam  {String} password Admin Admin Password
 * @apiParam  {String} company_type Company Type
 *
 *
 * @apiParamExample  {type} Request Example:
 * {
 *     email: "john@doe.com",
 *     password: "password",
 *     company_type: "distributor"
 * }
 *
 * @apiSuccessExample Success Response
 * HTTP/1.1 200 Ok
 * {
 *       status: "success",
 *       data: {
 *               token: "37dab215-024f-406f-a9f6-24330a5f931d",
 *               user: {
 *                   id: "28c682cb-1b9c-4ea3-8f6c-45c4d3497be3",
 *                   first_name: "Hetti",
 *                   last_name: "MacDearmid",
 *                   email: "hmacdearmid1@statcounter.com",
 *                   account_type: "distributor",
 *                   status: "active"
 *                }
 *               company: {
 *                   id: "37dab215-024f-406f-a9f6-24330a5f931d",
 *                   name: "Blue Company",
 *                   address: "Some company address",
 *                    email: "admin@bluecompany.com",
 *                    company_type: "distributor",
 *                    status: "active"
 *               }
 *           }
 * }
 *
 *
 */
exports.login = async (request, response) => {
    if (("error" in request.user))  return response.send(errorResponse(response,
        responseCode.FORBIDDEN, request.user.error));

    const user = request.user;
    return successResponse(response, responseCode.SUCCESS, 'Login Successful', user);
};

