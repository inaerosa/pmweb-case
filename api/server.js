const express = require("express");
const app = express();
const dotenv = require('dotenv') ;
dotenv.config();
const connection = require("./db/config/connection")

const PORT = process.env.PORT;
app.use(express.json());

const bookingRoutes = require('./routes/bookingRoutes')
const hotelGuestRoutes = require('./routes/hotelGuestRoutes');

app.use('/hotelGuest', hotelGuestRoutes)
app.use('/booking', bookingRoutes)
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})