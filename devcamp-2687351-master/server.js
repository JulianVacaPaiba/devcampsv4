//Dependecia commonjs
const express =require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const colors = require('colors')
//Dependeccias de rutas 
const bootcampRoutes= require('./routes/bootcampRoutes')
const coursesRoutes= require('./routes/coursesRoutes')
const reviewsRoutes= require('./routes/reviewsRoutes')
const userRoutes = require('./routes/userRoutes')
//Dependencia para conexiones DB
const connectBD = require('./config/db')


dotenv.config({
    path:'./config/.env'
})
connectBD()

// Crear el objeto app
const app =express();

app.use(express.json())
//Vincular las rutas de bootcamps
app.use('/api/v1/devcamp/bootcamps' , bootcampRoutes)
app.use('/api/v1/devcamp/courses' , coursesRoutes)
app.use('/api/v1/devcamp/reviews' , reviewsRoutes)
app.use('/api/v1/devcamp/auth', userRoutes)

//Primera prueba de url del servidor
app.get('/prueba',
        function(request,response){
            response.send("Hola!")
})

//Uris de Bootcamps

//traer bootcamps
app.get('/api/v1/devcamp/bootcamps', 
        (request,response)=>{
            response
                .status(200)
                .json({
                    "success":true ,
                    "msg":"mostrar todos los bootcamps"
                     
                })
            
        })
//traer bootcamps por id

app.get('/api/v1/devcamp/bootcamps/:id', 
    (request,response)=>{
        response
            .status(200)
            .json({
                "success":true ,
                "msg":`Seleccionando bootcamp con id  ${request.params.id}`
                     
            })
            
        })
//crear bootcamps
app.post('/api/v1/devcamp/bootcamps', 
        (request,response)=>{
            response
                .status(201)
                .json({
                    "success":true ,
                    "msg":"crear bootcamp"
                     
                })
            
        })

//actualizar bootcamps por id

app.put('/api/v1/devcamp/bootcamps/:id', 
    (request,response)=>{
        response
            .status(200)
            .json({
                "success":true ,
                "msg":`Acualizando bootcamp con id  ${request.params.id}`
                 
        })
        
    })

//eliminar bootcamps por id

    app.delete('/api/v1/devcamp/bootcamps/:id', 
    (request,response)=>{
        response
            .status(200)
            .json({
                "success":true ,
                "msg":`Eliminando bootcamp con id  ${request.params.id}`
             
    })
    
})

//evidencia: uris de courses

//traer courses
app.get('/api/v1/devcamp/courses', 
        (request,response)=>{
            response
                .status(200)
                .json({
                    "success":true ,
                    "msg":"mostrar todos los courses"
                     
                })
            
        })
//traer courses por id

app.get('/api/v1/devcamp/courses/:id', 
    (request,response)=>{
        response
            .status(200)
            .json({
                "success":true ,
                "msg":`Seleccionando course con id  ${request.params.id}`
                     
            })
            
        })
//crear courses
app.post('/api/v1/devcamp/courses', 
        (request,response)=>{
            response
                .status(201)
                .json({
                    "success":true ,
                    "msg":"crear course"
                     
                })
            
        })

//actualizar courses por id

app.put('/api/v1/devcamp/courses/:id', 
    (request,response)=>{
        response
            .status(200)
            .json({
                "success":true ,
                "msg":`Acualizando course con id  ${request.params.id}`
                 
        })
        
    })

//eliminar courses por id

    app.delete('/api/v1/devcamp/courses/:id', 
    (request,response)=>{
        response
            .status(200)
            .json({
                "success":true ,
                "msg":`Eliminando course con id  ${request.params.id}`
             
    })
    
})
//evidencia: uris de reviews
//traer reviews
app.get('/api/v1/devcamp/reviews', 
        (request,response)=>{
            response
                .status(200)
                .json({
                    "success":true ,
                    "msg":"mostrar todos los reviews"
                     
                })
            
        })
//traer reviews por id

app.get('/api/v1/devcamp/reviews/:id', 
    (request,response)=>{
        response
            .status(200)
            .json({
                "success":true ,
                "msg":`Seleccionando review con id  ${request.params.id}`
                     
            })
            
        })
//crear reviews
app.post('/api/v1/devcamp/reviews', 
        (request,response)=>{
            response
                .status(201)
                .json({
                    "success":true ,
                    "msg":"crear review"
                     
                })
            
        })

//actualizar reviews por id

app.put('/api/v1/devcamp/reviews/:id', 
    (request,response)=>{
        response
            .status(200)
            .json({
                "success":true ,
                "msg":`Acualizando review con id  ${request.params.id}`
                 
        })
        
    })

//eliminar bootcamps por id

    app.delete('/api/v1/devcamp/reviews/:id', 
    (request,response)=>{
        response
            .status(200)
            .json({
                "success":true ,
                "msg":`Eliminando review con id  ${request.params.id}`
             
    })
    
})
//evidencia: uris de users
//traer users
app.get('/api/v1/devcamp/users', 
        (request,response)=>{
            response
                .status(200)
                .json({
                    "success":true ,
                    "msg":"mostrar todos los users"
                     
                })
            
        })
//traer users por id

app.get('/api/v1/devcamp/users/:id', 
    (request,response)=>{
        response
            .status(200)
            .json({
                "success":true ,
                "msg":`Seleccionando user con id  ${request.params.id}`
                     
            })
            
        })
//crear bootcamps
app.post('/api/v1/devcamp/users', 
        (request,response)=>{
            response
                .status(201)
                .json({
                    "success":true ,
                    "msg":"crear user"
                     
                })
            
        })

//actualizar bootcamps por id

app.put('/api/v1/devcamp/users/:id', 
    (request,response)=>{
        response
            .status(200)
            .json({
                "success":true ,
                "msg":`Acualizando user con id  ${request.params.id}`
                 
        })
        
    })

//eliminar bootcamps por id

    app.delete('/api/v1/devcamp/users/:id', 
    (request,response)=>{
        response
            .status(200)
            .json({
                "success":true ,
                "msg":`Eliminando user con id  ${request.params.id}`
             
    })
    
})

//Establecer servidor 
const PUERTO = process.env.EXPRESS_PORT

app.listen(PUERTO,
    console.log(`servido escuchando en el puerto: ${PUERTO}`.bgGreen.black))

