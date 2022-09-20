const Exception = require('./../errors/Exception')
const Guest = require("../model/Guest");
const ValidGuestId = require('../validations/ValidGuestId');

class hotelGuestController {
    static async getAll(req,res) {
        const guests = await Guest.find({});
        if(!guests) throw Exception.NotFound('nothing to see here')
        res.status(200).json(guests)
    }

    static async getById(req, res){
        try{
            const { id } = req.params;
            const guest = await ValidGuestId(id)
            res.status(200).json(guest)
        }catch(err){
            res.status(500).json({message: err.message})
        }
    }

    static async postGuest(req,res) {
        try{
            const guest = new Guest(req.body);
            await guest.save()
            res.status(201).send(req.body)
        }catch(err){
            res.status(404).json({message: err.message});
        }
    }

    static async updateGuest(req,res) {
        try{
            const {id} = req.params;
            await ValidGuestId(id)
            await Guest.findByIdAndUpdate(id, req.body)
            res.status(200).send(req.body)
        }catch(err){
            res.status(err.status).json({message: err.message})
        }
    }

    static async deleteGuest(req,res){
        try{
            const { id } = req.params;
            await ValidGuestId(id)
            await Guest.findByIdAndDelete(id);
            res.status(200).send({message: 'Guest removed succesfully'})
        }catch(err){
            res.status(err.status).json({message: err.message})
        }
    }
}

module.exports = hotelGuestController;