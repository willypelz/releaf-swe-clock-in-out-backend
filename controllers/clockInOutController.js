const {successResponse, errorResponse, responseCode, pagination, page} = require('../utils/helpers');

const ClockInOutRepository = require('../repositories/ClockInOutRepository');

const clockInOutRequest = require('../requests/clockInOutRequest');
const updateStaffRequest = require('../requests/updateStaffRequest');


/**
 *
 * @api {post} /staffs Staff: Add
 * @apiName addStaff
 * @apiGroup Staff Account
 * @apiVersion  0.1.0
 *
 *
 * @apiParam  {String} name Staff name
 * @apiParam  {String} type Type
 * @apiParam  {String} duration Duration
 * @apiParam  {String} role Role
 *
 *
 * @apiParamExample  {type} Request Example:
 * {
 *     "name": "michael",
 *     "type": "contractor",
 *     "duration": "6month",
 * }
 *
 *
 * @apiSuccessExample Success Response
 * HTTP/1.1 201 Ok
 {
    "status": "success",
    "message": "Staff added successfully.",
    "data": {
        "_id": "604f1ed33edb08001f0ae61a",
        "name": "michael",
        "type": "contractor",
        "duration": "6month",
        "createdAt": "2021-03-15T08:46:11.564Z",
        "updatedAt": "2021-03-15T08:46:11.564Z",
        "__v": 0
    }
}
 * * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 422 UNPROCESSABLE ENTITY
 *     {
 *       "status": "error",
         "message": "Error creating staff",
 *     }
 *
 */
exports.clockInOut = async (request, response) => {

    // try {
        const reqBody = request.body;
        const {
            FormattedError, NormalizedValue
        } = clockInOutRequest.validate(reqBody);

        if (FormattedError)
            return errorResponse(
                response,
                response.UNPROCESSABLE_ENTITY,
                'Validation Error',
                FormattedError
            );

        let staff = await (new ClockInOutRepository).clockStaffInOut(NormalizedValue);

        return successResponse(
            response,
            responseCode.CREATED,
            `${staff.name} successfully clock  ${staff.clock_in_out_status}`,
            staff
        );
    // } catch (err) {
    //     return errorResponse(
    //         response,
    //         responseCode.UNPROCESSABLE_ENTITY,
    //         'Error creating Staff.'
    //     );
    // }
};

/**
 * @api {get} /staffs  Staff: List
 * @apiName ListStaffs
 * @apiGroup Staff Account
 *
 *
 * @apiSuccessExample Success-Response
 * HTTP/1.1 200 OK
 {
    "status": "success",
    "message": "list of staffs",
    "data": [
        {
            "_id": "604f1ed33edb08001f0ae61a",
            "name": "michael",
            "type": "contractor",
            "duration": "6month",
            "createdAt": "2021-03-15T08:46:11.564Z",
            "updatedAt": "2021-03-15T08:46:11.564Z",
            "__v": 0,
            "tags": []
        },
        {
            "_id": "604d2c3a87d7da001f2c05ee",
            "name": "qwer",
            "type": "employee",
            "createdAt": "2021-03-13T21:18:50.286Z",
            "updatedAt": "2021-03-13T21:18:50.286Z",
            "__v": 0,
            "tags": []
        }
    ]
}
 *
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 422 UNPROCESSABLE ENTITY
 *    {
 *      status: "false",
 *      message: "error fetching staffs"
 *    }
 *
 * @param request
 * @param response
 */
exports.clockInOutLogs = async (request, response) => {
    // try {
        const requestParams = request.query;
        const staffs = await (new StaffRepository).getStaffs(requestParams.pagination, requestParams.page);

        return successResponse(
            response,
            responseCode.SUCCESS,
            'list of staffs',
            staffs
        );
    // } catch (err) {
    //     return errorResponse(
    //         response,
    //         responseCode.UNPROCESSABLE_ENTITY,
    //         'error fetching staffs'
    //     );
    // }
};



/**
 * @api {get} /staffs/:id  Staff: Info
 * @apiName ListStaffs
 * @apiGroup Staff Account
 *
 *
 * @apiSuccessExample Success-Response
 * HTTP/1.1 200 OK
 {
    "status": "success",
    "message": "details of staff",
    "data": {
        "_id": "604f1ed33edb08001f0ae61a",
        "name": "michael",
        "type": "contractor",
        "duration": "6month",
        "createdAt": "2021-03-15T08:46:11.564Z",
        "updatedAt": "2021-03-15T08:46:11.564Z",
        "__v": 0,
        "tags": []
    }
}
 *
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 422 UNPROCESSABLE ENTITY
 *    {
 *      status: "false",
 *      message: "error fetching staff details"
 *    }
 *
 * @param request
 * @param response
 */
exports.getSingleStaff = async (request, response) => {
    try {
        const staff = await (new StaffRepository).getStaff(request.params.id);

        if (!staff)
            return errorResponse(
                response,
                responseCode.NOT_FOUND,
                'Staff not found'
            );

        return successResponse(
            response,
            responseCode.SUCCESS,
            'details of staff',
            staff
        );
    } catch (err) {
        return errorResponse(
            response,
            responseCode.UNPROCESSABLE_ENTITY,
            'error fetching staff details'
        );
    }
};


/**
 * @api {patch} /staffs/:id  Staff: update
 * @apiName ListStaffs
 * @apiGroup Staff Account
 *
 *
 * @apiSuccessExample Success-Response
 * HTTP/1.1 200 OK
 {
    "status": "success",
    "message": "updated staff",
    "data": {
        "_id": "604f1ed33edb08001f0ae61a",
        "name": "michael",
        "type": "contractor",
        "duration": "6month",
        "createdAt": "2021-03-15T08:46:11.564Z",
        "updatedAt": "2021-03-15T08:50:05.371Z",
        "__v": 0
    }
}
 *
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 422 UNPROCESSABLE ENTITY
 *    {
 *      status: "false",
 *      message: "error updating staff"
 *    }
 *
 * @param request
 * @param response
 */
exports.updateStaff = async (request, response) => {
    try {
        const reqBody = request.body;
        const {
            FormattedError, NormalizedValue
        } = updateStaffRequest.validate(reqBody);

        if (FormattedError)
            return errorResponse(
                response,
                response.UNPROCESSABLE_ENTITY,
                'Validation Error',
                FormattedError
            );

        const staff = await (new StaffRepository).updateStaff(request.params.id, NormalizedValue);

        return successResponse(
            response,
            responseCode.SUCCESS,
            'updated staff',
            staff
        );
    } catch (err) {
        return errorResponse(
            response,
            responseCode.UNPROCESSABLE_ENTITY,
            'error updating staff'
        );
    }
};

/**
 * @api {delete} /staffs/:id Staffs: Remove
 * @apiName removeStaff
 * @apiGroup Staff Account
 *
 * @apiParam {string} :id Staff unique ID
 *
 * @apiSuccessExample Success Response
 * HTTP/1.1 204 No Content
 *
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 422 UNPROCESSABLE ENTITY
 *    {
 *      status: "false",
 *      message: "Error deleting staff"
 *    }
 *
 *
 * @apiErrorExample {json} Error-Response:
 *    HTTP/1.1 404 NOT FOUND
 *    {
 *      status: "false",
 *      message: "Staff not found"
 *    }
 *
 * @param request
 * @param response
 */
exports.deleteStaff = async (request, response) => {
    try {
        const id = request.params.id;
        let staff = await (new StaffRepository).getStaff(id);
        if (!staff)
            return errorResponse(
                response,
                responseCode.NOT_FOUND,
                'Staff not found'
            );

        return successResponse(
            response,
            responseCode.NO_CONTENT,
            '',
            await (new StaffRepository).deleteStaff(id)
        );

    } catch (err) {
        return errorResponse(
            response,
            responseCode.UNPROCESSABLE_ENTITY,
            'Error deleting staff',
        );
    }
};
