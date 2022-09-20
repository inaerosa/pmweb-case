const Exception = require('./../errors/Exception')
const Guest = require("../model/Guest");

class hotelGuestController {
    static async getAll(req,res) {
        const guests = await Guest.find({});
        if(!guests) throw Exception.NotFound('nothing to see here')
        res.status(200).json(guests)
    }

    static async getById(req, res){
        try{
            const { id } = req.params;
            const guest = await Guest.findById({_id: id})
            if(!guest) throw Exception.BadRequest('there isnt a hotel guest with this ID')
            res.status(200).json(guest)
        }catch(err){
            res.status(err.status).json({message: err.message})
        }
    }

    static async postGuest(req,res) {
        try{
            const guest = new Guest(req.body);
            await guest.save()
            res.status(201).send(req.body)
        }catch(err){
            res.status(err.status).json({message: err.message});
        }
    }

    static async updateGuest(req,res) {
        try{
            const {id} = req.params;
            const guest = await Guest.findByIdAndUpdate(id, req.body)
            if(!guest) throw Exception.BadRequest('there isnt a hotel guest with this ID')
            res.status(200).send(req.body)
        }catch(err){
            res.status(err.status).json({message: err.message})
        }
    }

    static async deleteGuest(req,res){
        try{
            const { id } = req.params;
            const guest = await Guest.findByIdAndDelete(id);
            if(!guest) throw Exception.BadRequest('there isnt a hotel guest with this ID')
            res.status(200).send({message: 'Guest removed succesfully'})
        }catch(err){
            res.status(err.status).json({message: err.message})
        }
    }
}

module.exports = hotelGuestController;