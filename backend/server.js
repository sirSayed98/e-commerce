const express = require('express');
const app = express();
const colors = require('colors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');


//import routers
const ProductRouter = require('./routes/product');


dotenv.config('.env');


// Connect to db
connectDB();

//mounting routers
app.use('/api/v1/products', ProductRouter)




//errorHandler
app.use(errorHandler);

const Port = process.env.PORT || 5000;
app.listen(Port, () => {
    console.log(`App listening on port ${Port} on ${process.env.NODE_ENV} mode`.bgYellow.bold);
});