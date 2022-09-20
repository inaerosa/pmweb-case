const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
name: {
    type: String,
    required: true
},
email: {
    type: String,
    required: true
},
birthday: {
    type: Date,
    required: true
},
phone: {
    type: String,
    required: true
},
city:{
    type:  String,
    required: true
},
state: {
    type: String,
    required: true
},
country: {
    type: String,
    required: true
},
    bookings: [{
    name: {
        type: String,
        required: true
    },
    numberRoom: {
        type: String,
        required: true
    },
    bookingValue: {
        type: String,
        required: true
    },
        bookingDate: {
            type: Date,
            default: Date.now(),
            required: true
        },
        bookingStart: Date,
        bookingEnd: Date,
    bookingStatus: {
        type: String,
        required: true
    },
    }]
    
})     

const Guest = mongoose.model("guest", guestSchema);

module.exports = Guest;