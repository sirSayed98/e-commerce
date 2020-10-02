const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config('.env');



const Port = process.env.PORT || 5000;
app.listen(Port, () => {
    console.log(`App listening on port ${Port} on ${process.env.NODE_ENV} mode`);
});