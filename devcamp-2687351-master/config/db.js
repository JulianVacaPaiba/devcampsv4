const mongoose = require('mongoose')




//funcion de conexion
async function connectDB (){
    const conn= await mongoose.connect(process.env.MONGO_URL)
    console.log(`Conectado a mongo`.bgGreen.black)
}

module.exports = connectDB
