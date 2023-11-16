const express=require('express')
const usersModel = require('../models/UserModels')
const  mongoose  = require('mongoose')
const router =express.Router()
const jwt = require('jsonwebtoken')
router.post('/register',
    async(req, res)=>{
        const {name,email,role,password} = req.body
        try{
        const user = 
            await usersModel.create({name,email,role,password})
            res.status(201)
            .json({
                success: true,
                msg: "Usuario registrado exitosamente",
                token: user.ObtenerJWT()
            })
        }catch(error){
            res.
            status(400).
            json({
                sucess: false,
                message: error.message
            })
        }
    })


router.post('/login', async(req,res)=>{
        //desestructuracion:
        //-objetos
        //-arreglos
        const {email,password} =req.body;

        //si no llega email o passsword
        if(!email || !password){
            res.status(400).json({
                success:false,
                message:"debe ingresar email o password"
            })
        }else{
            try{
            //encontrar usuario que tenga el email
            const user = await usersModel.findOne({email}).select("+password")
            //console.log(user)
            if(!user){
                res.status(400).json({
                    success:false,
                    message:"No se encontro el usuario"
                })
            }else{
                //Utilizar el metodo de comparar el email
                const isMatch = await user.comparePassword(password)
                if(!isMatch){
                    res.status(400).json({
                        success: false,
                        message: "Contraseña incorrecta"
                    })
                }else{
                    res.status(201).json({
                        success: true,
                        message: "datos validos",
                        token: user.ObtenerJWT()
                    })
                }
            }


        }catch(error){
           
        }
        }

})

    module.exports=router