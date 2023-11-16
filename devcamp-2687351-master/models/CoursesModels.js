const mongoose = require('mongoose')

//Definir el modelo para Courses

const CousesSchema = mongoose.Schema({
    title:{
        type: String,
        required: [true, "titulo de courses requerido"],
        maxlength: [30,"longitud de courses menor a 30"],
        minlength: [10,"longitud de courses mayor a 10"]
    },
    description:{
        type: String,
        required: [true, "descripcion de courses requerido"],
        minlength: [10,"longitud de courses mayor a 10"]
    },
    weeks:{
        type: Number,
        required: [true, "duracion requerida"],
        max: [9,"longitud de duracion menor a 9"],
        min: [1,"longitud de courses menor a 1"]
    },
    enroll_cost:{
        type: Number,
        required: [true, "costo requerida"],

    },
    minimum_skill:{
        required: [true, "minima skil requerida"],
        type: String,
        enum:[
            "Beginner",
            "Intermediate",
            "Advanced",
            "Expert"
        ]
    },

    AverageRating: Number,

    createdAt: Date
})

module.exports = mongoose.model('Courses', CousesSchema)