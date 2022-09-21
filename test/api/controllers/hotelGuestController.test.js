const superagent = require('superagent')

describe('api :: controllers :: hotelGuestController', () => {
    it('should get all hotelguests', async() => {
        const res = await superagent('GET', 'localhost:3000/hotelGuest')
        expect(res.status).toBe(200)
        expect(res.body[0].name).toBe('some_name')
        expect(res.body.length).toEqual(2)
    })
    it('should get an specfic hotelGuest', async() => {
        const res = await superagent('GET', 'localhost:3000/hotelGuest/632a4d0918da97bf09906d4d')
        expect(res.status).toBe(200)
        expect(res.body.name).toBe('Inaê')
    })
    it('should capture an error if doesnt exist a guest', async() => {
        try{
            await superagent('GET', 'localhost:3000/hotelGuest/632a4407372917b939793b39')
        }catch(err){
          expect(err.response.text).toBe('{"message":"there isnt a hotel guest with this ID"}')
        }
    })
});