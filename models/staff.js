const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require('jwt-simple');
const softDelete = require('mongoose-delete');

let StaffSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    staff_id: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    clock_in_out_status: {
        type: String,
        enum: ['in', 'out'],
        default: 'out'
    },
    phone_number: {
        type: String,
        required: false
    },

    department: {
        type: String,
        required: false
    },

    address: {
        type: String,
        required: false
    },

    password: {type: String, select: false},


}, {
    timestamps: true
});


StaffSchema.plugin(softDelete, {deletedAt: true, validateBeforeDelete: true, overrideMethods: ['count', 'find', 'findOne', 'findOneAndUpdate', 'update'] });





StaffSchema.pre('save', function (next) {
    this.log('saving staff...');
    next();
});

StaffSchema.post('save', function (doc) {
    this.log('staff saved!');
});

StaffSchema.method('log', function (message) {
    console.log('log: ' + message);
});



module.exports = mongoose.model('Staff', StaffSchema)
