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
const order=require('./routes/order')

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
app.use('/api/v1/order', order);

//get Paypal_client_id
app.get('/api/v1/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

//errorHandler
app.use(errorHandler);

const Port = process.env.PORT || 5000;
app.listen(Port, () => {
    console.log(`App listening on port ${Port} on ${process.env.NODE_ENV} mode`.bgYellow.bold);
});