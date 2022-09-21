const superagent = require('superagent')

describe('api :: controllers :: bookingController', () => {

    it('should getAll registers', async () => {
        const res = await superagent('GET', 'localhost:3000/booking')
        expect(res.status).toBe(200)
        expect(res.body[0].bookings[0].name).toBe('Hotel Overlook')
    });

    it('should get an guest with bookings by id', async () => {
        const res = await superagent('GET', 'localhost:3000/booking/632a4407372917b939793b38')
        expect(res.status).toBe(200)
        expect(res.body[0].bookings[0].name).toBe('Hotel Overlook')
    });

    it('should return all bookings by status', async () => {
        const res = await superagent('GET', 'localhost:3000/booking/632a4407372917b939793b38/CONFIRMADA')
        expect(res.status).toBe(200)
    })

    it('should return a message if has an syntax error', async () => {
        try{
            await superagent('GET', 'localhost:3000/booking/632a4407372917b939793b38/confirmado')
        } catch(err){
            expect(err.response.text).toBe('{"message":"you should use some valid status like CONFIRMADA, CANCELADA, CHECKIN, CHECKOUT"}')
        }
        
    })

})