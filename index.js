const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const checkAuth = require('./middleware/checkAuth');

// crear la app
const app = express();
// Connect to DB
connectDB();
// Hablilitar Cors
const whiteList = [process.env.FRONT_URL] // crear un white list para los dominios permitidos
const corsOptions = {
    origin: function(origin, callback){
        if(whiteList.includes(origin)){
            // Incluye puede hacer la consulta
            callback(null, true );
        }else{
            // Bloquear
            callback( new Error('URL not allowed to make requests'))
        }
    }
}
//app.use(cors(corsOptions))
app.use(cors());
// Habilitar la opcion de usar json para la lectura de datos
app.use(express.json({ extended: true }));

// Import routes
app.use('/api/create-account', require('./routes/users'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/confirm-account', require('./routes/confirmAccount'));
app.use('/api/reset-password', require('./routes/resetPassword'));

//Ueer Profile
app.use('/api/profile', checkAuth, require('./routes/userProfile'))

app.use('/api/dishes', checkAuth, require('./routes/dish'));

// Port
const port = process.env.PORT || 4000;

//Create the server
app.listen( port, () => {
    console.log(`Server is running on port ${port}`);
})