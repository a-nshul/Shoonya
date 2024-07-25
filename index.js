const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
connectDB();

app.use(bodyParser.json());

app.use('/retreats', require('./routes/retreatsRouthe'));
app.use('/bookings', require('./routes/bookingsRouthe'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
