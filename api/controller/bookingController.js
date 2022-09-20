const Exception = require('../errors/Exception');
const Guest = require('../model/Guest');
const ValidGuestId = require('../validations/ValidGuestId');
const ValidBookingId = require('../validations/ValidBookingId')
const ValidStatus = require('../validations/ValidStatus');

class bookingController {
    static async getAll(req,res) {
        const booking = await Guest.find({}, {bookings: 1});
        res.status(200).send(booking);
    }
    
    static async getByGuest(req, res) {
        const { id } = req.params;
        try{
            const bookings = await Guest.find({_id: id});
            if(bookings.length == 0) throw Exception.NotFound('nothing to see here');
            res.status(200).send(bookings);
        } catch(err){
            res.status(err.status).send({message: err.message});
        }
    }

    static async getByStatus(req,res) {
        const { status } = req.params;
        const {id} = req.params
        try{
            ValidStatus(status.toUpperCase());
            const guest = await ValidGuestId(id);
            const bookingsByStatus = guest.bookings.filter(booking => booking.bookingStatus == status.toUpperCase());
            if(bookingsByStatus.length == 0) throw Exception.NotFound('nothing to see here');
            res.status(200).json(bookingsByStatus);
        } catch(err){
            res.status(err.status).send({message: err.message});
        }
    }

    static async saveBooking(req,res) {
        const { id } = req.params;
        const booking = req.body;
        try{
            ValidStatus(booking.bookingStatus.toUpperCase());
            await ValidGuestId(id)
            await Guest.findByIdAndUpdate(id, {$push: {bookings: req.body}})
            res.status(201).json(req.body)
        } catch(err){
            res.status(err.status).send({message: err.message});
        }   
    }

    static async updateStatus(req, res) {
        const { idGuest, idBooking }= req.params;
        const {bookingStatus} = req.body;
        try{    
            ValidStatus(bookingStatus.toUpperCase());
            const guest = await ValidGuestId(idGuest)
            ValidBookingId(guest, idBooking)
            await Guest.updateOne({_id: idGuest, 'bookings._id': idBooking}, {$set: {'bookings.$.bookingStatus': bookingStatus.toUpperCase()}})
            res.status(200).send(bookingStatus)
        }catch(err){
            res.status(err.status).send({message: err.message})
        }
    }

    static async deleteBooking(req, res) {
        const { idGuest, idBooking } = req.params;
        try{
            const guest = await ValidGuestId(idGuest)
            ValidBookingId(guest, idBooking)
            await Guest.findByIdAndUpdate(idGuest, {$pull: {bookings: {_id: idBooking}}})
            res.status(200).send({message: "Booking removed sucessfully"});
        }catch(err){
            res.status(err.status).send({message: err.message})
        }
    }
}

module.exports = bookingController;
