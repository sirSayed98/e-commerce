const express = require('express');
const app = express();
const colors = require('colors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const CORS = require('cors')


//import routers
const ProductRouter = require('./routes/product');
const users = require('./routes/user');
const auth = require('./routes/auth');

dotenv.config('.env');


// Connect to db
connectDB();

// Enable CORS
app.use(CORS());

// Body parser
app.use(express.json());

//mounting routers
app.use('/api/v1/products', ProductRouter)
app.use('/api/v1/auth/users', users);
app.use('/api/v1/auth', auth);



//errorHandler
app.use(errorHandler);

const Port = process.env.PORT || 5000;
app.listen(Port, () => {
    console.log(`App listening on port ${Port} on ${process.env.NODE_ENV} mode`.bgYellow.bold);
});