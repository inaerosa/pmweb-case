const StatusEnum = require('./StatusEnum')
const Exception = require('./../errors/Exception')

module.exports = (bookingStatus) =>  {
    const status = StatusEnum()
    if(!Object.keys(status).includes(bookingStatus.toUpperCase())) throw Exception.BadRequest('you should use some valid status like CONFIRMADA, CANCELADA, CHECKIN, CHECKOUT')
}