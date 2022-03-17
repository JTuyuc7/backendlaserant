const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// crear la app
const app = express();
// Connect to DB
connectDB();
// Hablilitar Cors
app.use(cors());
// Habilitar la opcion de usar json para la lectura de datos
app.use(express.json({ extended: true }));

// Import routes
app.use('/api/dishes', require('./routes/dish'));

// Port
const port = process.env.PORT || 4000;

//Create the server
app.listen( port, () => {
    console.log(`Server is running on port ${port}`);
})