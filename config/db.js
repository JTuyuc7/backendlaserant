const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env'});

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_DB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useFindAndModify: false,
            //useCreateIndex: true
        });
        
        const url = `${connection.connection.host}_ ${connection.connection.port}`;
        console.log('Database Connected correctly', url)
    } catch (error) {
        console.log(error, 'Unable to connect to DB');
        process.exit(1); // Stop if the app could not be connected
    }
}

module.exports = connectDB;
