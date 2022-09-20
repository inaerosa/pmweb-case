const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connection = mongoose.connect(`mongodb://localhost:${process.env.DB_PORT}/${process.env.DB_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log("database connection established")
}).catch((err) => {
    console.log("error connecting to DB")
});

module.exports = connection;