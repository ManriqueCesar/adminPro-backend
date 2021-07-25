const mongoose = require('mongoose');
require('dotenv').config();


const dbConnection = async () =>{

    try {
        await mongoose.connect(process.env.Db_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('DB online');
    } catch (error) {
        console.log(error);
        throw new Error('Error al conectar la bd')
    }
 


}

module.exports = {
    dbConnection
}