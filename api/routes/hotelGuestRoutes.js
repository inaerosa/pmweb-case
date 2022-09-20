const HotelGuestController = require("../controller/hotelGuestController");

const routes = require("express").Router();

routes.get('/', HotelGuestController.getAll)
    .post('/', HotelGuestController.postGuest)
    .get('/:id', HotelGuestController.getById)
    .put('/:id', HotelGuestController.updateGuest)
    .delete('/:id', HotelGuestController.deleteGuest)

module.exports = routes;