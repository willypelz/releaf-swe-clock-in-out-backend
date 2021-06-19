const mongoose = require('mongoose');
const staff = require('../models/staff');
const clockInOutLog = require('../models/clockinout_log');


class StaffRepository {

    constructor() {
        this.model = staff;
        this.clockInOutLog = clockInOutLog
    }
    async clockStaffInOut(data) {
        const staff = await this.model.findOne({staff_id: data.staff_id}).exec();

        if (staff.clock_in_out_status === data.status) return  { error: "you have already clock " +  data.status }
        //clock staff in/out
        const staffClockInOut = this.model.findByIdAndUpdate({_id: staff._id}, {clock_in_out_status: data.status}, {new: true});
        //log all staff cock in out
        await this.clockInOutLog.create({staff_id: staff._id, action: data.status});

        return staffClockInOut;
    }

}

module.exports = StaffRepository;
