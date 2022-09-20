const Exception = require('../errors/Exception')
const Guest = require('./../model/Guest')

module.exports = async (id) => {
    const guest = await Guest.findById(id)
    if (!guest) throw Exception.BadRequest('there isnt a hotel guest with this ID')
    return guest;
}