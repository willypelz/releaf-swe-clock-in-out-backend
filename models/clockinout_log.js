const mongoose = require('mongoose');

let ClockInOutLogSchema = new mongoose.Schema({
    staff_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Staff',
        required: true
    },
    action: {
        type: String,
        required: true
    }

}, {
    timestamps: true
});


module.exports = mongoose.model('ClockInOutLog', ClockInOutLogSchema)
