const mongoose = require('mongoose');
const staff = require('../models/staff');
const clockinout = require('../models/clockinout_log');

const {generateStaffID} = require('../utils/helpers');


class StaffRepository {

    constructor() {
        this.model = staff;
        this.clockinout = clockinout;
    }

    async addStaff(data) {
       const staff = await this.getStaffByEmail(data.email);
       if (staff) return {error: 'Staff already exist with this mail.'}
        data.staff_id = await generateStaffID(data.name);
       return this.model.create(data);

    };

    async generateStaffId(data){

    }

    async getStaffs(limitPerPage, pageNumber) {
       return await this.model.find({})
            .skip((pageNumber - 1) * limitPerPage)
            .limit(limitPerPage)
            .sort({createdAt: -1})
            .exec();
    }



    async getStaff(staff_id) {
       return   this.model.findOne({staff_id}).exec();
    }

    async getStaffByEmail(email) {
        return   this.model.findOne({email}).exec();
    }
    async updateStaff(id, data) {
        return this.model.findByIdAndUpdate({_id: id}, data, {new: true});
    }

    async deleteStaff(id) {
        return this.model.findByIdAndDelete(id);
    };

    deepCopy(data) {
        return JSON.parse(JSON.stringify(data))
    }
}

module.exports = StaffRepository;
