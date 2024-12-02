const express = require('express');
const errHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection');
const dotenv = require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

connectDb();


app.use(express.json()); //to receive the body from the client
app.use('/api/contacts', require('./routes/contactRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.use(errHandler)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})