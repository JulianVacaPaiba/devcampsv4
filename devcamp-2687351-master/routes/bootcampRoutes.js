const express=require('express')
const bootcampModel = require('../models/BootcampsModels')
const  mongoose  = require('mongoose')
const router =express.Router()

router.get('/prueba',
        function(request,response){
            response.send("Hola!")
})

//Uris de Bootcamps

//traer bootcamps
router.get('/', 
        async(request,response)=>{
            try{
            //TRAER TODOS LOS BOOTCAMP 
            const  bootcamps =
                await bootcampModel.find()

                if(bootcamps.length === 0){
        
            return response
        
                .status(404)
                .json({
                    "success":false ,
                    "msg":"mo hay bootcamps disponibls"
                     
                })
            }
            response
            .status(201)
            .json({
                "success":true ,
                "results":bootcamps
                 
            })
            }catch(error){
            response.status(500)
            .json({
                success:false,
                msg:"Error interno de servidor"
            })
            }
        })
//traer bootcamps por id

router.get('/:id', 
    async(request,response)=>{
        try{
        //Traer el parametro id
        const bootcampId = request.params.id
            if(!mongoose.Types.ObjectId.isValid(bootcampId)){

                response.status(500)
                .json({
                    success:false,
                    msg:"Identificador invalido"
                })
            }else{
                const selected_Bootcamps = await bootcampModel.findById(bootcampId)
                if (!selected_Bootcamps) {
                    response
                    .status(404)
                    .json({
                    sucess: false,
                    msg : `No se hallo el bootcamp con id:${bootcampId}`
                    })
                
        }else{
        response
            .status(200)
            .json({
                "success":true ,
                "msg":selected_Bootcamps
                     
            })
        }
            }
        }catch(error){ response.status(500)
            .json({
                success:false,
                msg:"Error interno de servidor"
            }) }
        
        })
       
//crear bootcamps
router.post('/', 
        async (request,response)=>{
            try {
                
        
            //crear el nuevo bootcamp
            const bootcamp = await bootcampModel.
                        create(request.body)
                        response
                        .status(201)
                        .json({
                            "success":true ,
                            "data": bootcamp 
                             
                        })

            } catch (error) {
                response.status(500)
            .json({
                success:false,
                msg:error.message
            })
            }
            
        })

//actualizar bootcamps por id

router.put('/:id',
        async (request, response)=> {
            try {
                const bootcampId = request.params.id
                if(!mongoose.Types.ObjectId.isValid(bootcampId)){
                    response
                    .status(500)
                    .json({
                    sucess: false,
                    msg: "Identificador invalido"
                        })

                }
                else{
                    const selected_bootcamp =
                        await bootcampModel.findByIdAndUpdate(
                            bootcampId,
                            request.body,
                            {
                                new: true
                            }
                        )
    
                    if (!selected_bootcamp){
                        response
                        .status(404)
                        .json({
                            sucess:false,
                            msg: `no se encontro el bootcamp con id: ${bootcampId}`
                        })
    
                    }else{
    
                    response
                        .status(200)
                        .json({
                            "success": true,
                            "results": selected_bootcamp
                        })
                    }
                }
        
            } catch (error) {
                response
                .status(500)
                .json({
                    sucess: false,
                    msg: error.message
                })
            }})

//eliminar bootcamps por id

    router.delete('/:id', 
    async(request,response)=>{
        try {
            
        
        //seleccionar id del bootcamp
        bootcampId = request.params.id
        const DelBootcamp = await bootcampModel.findByIdAndDelete(
            bootcampId
        )
        response
            .status(200)
            .json({
                "success":true ,
                "result" : DelBootcamp
             
    })
    } catch (error) {
        response.status(500)
        .json({
            success:false,
            msg:error.message
        })
    }
    
})

//evidencia: uris de courses

//traer courses
router.get('/api/v1/devcamp/courses', 
        (request,response)=>{
            response
                .status(200)
                .json({
                    "success":true ,
                    "msg":"mostrar todos los courses"
                     
                })
            
        })
//traer courses por id

router.get('/api/v1/devcamp/courses/:id', 
    (request,response)=>{
        response
            .status(200)
            .json({
                "success":true ,
                "msg":`Seleccionando course con id  ${request.params.id}`
                     
            })
            
        })
//crear courses
router.post('/api/v1/devcamp/courses', 
        (request,response)=>{
            response
                .status(201)
                .json({
                    "success":true ,
                    "msg":"crear course"
                     
                })
            
        })

//actualizar courses por id

router.put('/api/v1/devcamp/courses/:id', 
    (request,response)=>{
        response
            .status(200)
            .json({
                "success":true ,
                "msg":`Acualizando course con id  ${request.params.id}`
                 
        })
        
    })

//eliminar courses por id

    router.delete('/api/v1/devcamp/courses/:id', 
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
router.get('/api/v1/devcamp/reviews', 
        (request,response)=>{
            response
                .status(200)
                .json({
                    "success":true ,
                    "msg":"mostrar todos los reviews"
                     
                })
            
        })
//traer reviews por id

router.get('/api/v1/devcamp/reviews/:id', 
    (request,response)=>{
        response
            .status(200)
            .json({
                "success":true ,
                "msg":`Seleccionando review con id  ${request.params.id}`
                     
            })
            
        })
//crear reviews
router.post('/api/v1/devcamp/reviews', 
        (request,response)=>{
            response
                .status(201)
                .json({
                    "success":true ,
                    "msg":"crear review"
                     
                })
            
        })

//actualizar reviews por id

router.put('/api/v1/devcamp/reviews/:id', 
    (request,response)=>{
        response
            .status(200)
            .json({
                "success":true ,
                "msg":`Acualizando review con id  ${request.params.id}`
                 
        })
        
    })

//eliminar bootcamps por id

    router.delete('/api/v1/devcamp/reviews/:id', 
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
router.get('/api/v1/devcamp/users', 
        (request,response)=>{
            response
                .status(200)
                .json({
                    "success":true ,
                    "msg":"mostrar todos los users"
                     
                })
            
        })
//traer users por id

router.get('/api/v1/devcamp/users/:id', 
    (request,response)=>{
        response
            .status(200)
            .json({
                "success":true ,
                "msg":`Seleccionando user con id  ${request.params.id}`
                     
            })
            
        })
//crear bootcamps
router.post('/api/v1/devcamp/users', 
        (request,response)=>{
            response
                .status(201)
                .json({
                    "success":true ,
                    "msg":"crear user"
                     
                })
            
        })

//actualizar bootcamps por id

router.put('/api/v1/devcamp/users/:id', 
    (request,response)=>{
        response
            .status(200)
            .json({
                "success":true ,
                "msg":`Acualizando user con id  ${request.params.id}`
                 
        })
        
    })

//eliminar bootcamps por id

    router.delete('/api/v1/devcamp/users/:id', 
    (request,response)=>{
        response
            .status(200)
            .json({
                "success":true ,
                "msg":`Eliminando user con id  ${request.params.id}`
             
    })
    
})
module.exports=router