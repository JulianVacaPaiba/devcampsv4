const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Nombre de usuario requerido"]
    
    },
    email:{
        type:String,
        required:[true, "correo de usuario requerido"],
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    role:{
        type:String,
        required:[true, "rol de usuario requerido"]   ,
        enum:[
            "user",
            "publisher"
        ]
    },
    password:{
        type:String,
        required:[true, "correo de usuario requerido"],
        max:6,
        select:false
    },
    createdAt:{
        type:Date,
        default:Date.now

    }
})

//crear la accion pre
UserSchema.pre('save', async function(next){
    //crear la sal
    const sal = await bcryptjs.genSalt(10)
    //encriptar la contraseña
    this.password = await bcryptjs.hash(this.password, sal)
})


//metodo que me construye el jwt
UserSchema.methods.ObtenerJWT= function(){
    const JWT_SECRET_KEY = "c0Ntr1s3ñ1"
    return jwt.sign({ 
        id: this._id,
    }, JWT_SECRET_KEY,{
        expiresIn: Date.now() + 10000
    }
    )
}

//metodo para comparar password del body con el password de la identidad.



UserSchema.methods.comparePassword = async function(password){
    //Comparar los passwords
    return await bcryptjs.compare(password, this.password)
}

const user = mongoose.model('Users', UserSchema)
module.exports = user