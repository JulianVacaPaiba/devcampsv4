const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
    title:{
        type:String,
        required:[true, "Titulo de la reseña requerida"],
        maxlength:[20, "Titulo menor a 20"],
    },
    text:{
        type:String,
        required:[true, "Texto de la reseña requerida"],
        maxlength:[20, "Texto menor a 50"],
    },
    rating:{
        type:Number,
        required:[true, "Calificacion de la reseña requerida"],
        max: [10,"longitud de duracion menor a 9"],
        min: [1,"longitud de courses menor a 1"]

    },
    bootcamp_id:{
        type:String,
        required:[true, "Id del bootcamp requerido"]
    },
    user_id:{
        type:String,
        required:[true, "Id del usuario requerido"]
    }

})
module.exports = mongoose.model('Reviews', reviewSchema)