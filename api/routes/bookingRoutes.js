const router = require("express").Router();
const bookingController = require('../controller/bookingController');

router
    .get("/", bookingController.getAll)
    .get("/:id", bookingController.getByGuest)
    .get("/:id/:status", bookingController.getByStatus)
    .post("/:id", bookingController.saveBooking)
    .patch("/:idGuest/:idStatus", bookingController.updateStatus)
    .delete("/:idGuest/:idBooking", bookingController.deleteBooking);

module.exports = router;