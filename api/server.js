const express = require("express");
const app = express();
const dotenv = require('dotenv') ;
dotenv.config();
const connection = require("./db/config/connection")
const cors = require('cors');

const PORT = process.env.PORT;
app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");

    res.header("Access-Control-Allow-Methods", 'GET,PATCH,PUT,POST,DELETE');
    app.use(cors());
    next();
});

const bookingRoutes = require('./routes/bookingRoutes')
const hotelGuestRoutes = require('./routes/hotelGuestRoutes');

app.use('/hotelGuest', hotelGuestRoutes)
app.use('/booking', bookingRoutes)

const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');

app.use(
    '/api-docs',
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument)
  );

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})