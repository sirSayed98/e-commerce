const express = require('express');
const app = express();
const colors = require('colors');
const dotenv = require('dotenv');
const connectDB = require('./config/db')

//import routers
const ProductRouter = require('./routes/product');


dotenv.config('.env');


// Connect to db
connectDB();

//mounting routers
app.use('/api/products', ProductRouter)



const Port = process.env.PORT || 5000;
app.listen(Port, () => {
    console.log(`App listening on port ${Port} on ${process.env.NODE_ENV} mode`.bgYellow.bold);
});