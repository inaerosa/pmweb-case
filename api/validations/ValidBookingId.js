const Exception = require("../errors/Exception")

module.exports = (guest, idBooking) => {
    const bookings = guest.bookings.filter(booking => booking._id == idBooking)
    if (bookings.length == 0) throw Exception.BadRequest('There isnt a booking with this ID')
    return bookings
}