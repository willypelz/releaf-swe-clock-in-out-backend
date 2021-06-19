const userModelData = require('../models/staff');
const mongoose = require('mongoose');


class AuthRepository {

    constructor() {
        this.userModel = userModelData;
    }

    async login(staff_id, password) {

        const userData = await this.userModel.findOne({staff_id}).select('+password')
            .then(async (user) => {
                if (!user) return {error: 'Invalid Staff ID'}
                // const confirmPass = await user.validPassword(password);
                // if (!(confirmPass)) return {error: 'Invalid Password'}
                // this.lastLogin(user._id);
                return {success: 'Login  Successful', user};
            });
        return userData;
    }


    async lastLogin(id) {
        return this.userModel.findByIdAndUpdate({_id: id},
            {last_login: new Date()}, {new: true});
    }
}

module.exports = AuthRepository;

