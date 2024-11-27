const express = require('express');
const dotenv = require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;


app.use(express.json()); //to receive the body from the client
app.use('/api/contacts', require('./routes/contactRoutes'))

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

//25.57