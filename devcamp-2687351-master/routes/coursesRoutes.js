
const express=require('express')
const coursesModel = require('../models/CoursesModels')
const  mongoose  = require('mongoose')
const router =express.Router()
//traer courses
router.get('/', 
        async(request,response)=>{
            try{
            //TRAER TODOS LOS BOOTCAMP 
            const  courses =
                await coursesModel.find()

                if(courses.length === 0){
        
            return response
        
                .status(404)
                .json({
                    "success":false ,
                    "msg":"mo hay courses disponibls"
                     
                })
            }
            response
            .status(201)
            .json({
                "success":true ,
                "results":courses
                 
            })
            }catch(error){
            response.status(500)
            .json({
                success:false,
                msg:"Error interno de servidor"
            })
            }
        })
//traer courses por id

router.get('/:id', 
    async(request,response)=>{
        try{
        //Traer el parametro id
        const coursesId = request.params.id
            if(!mongoose.Types.ObjectId.isValid(coursesId)){

                response.status(500)
                .json({
                    success:false,
                    msg:"Identificador invalido"
                })
            }else{
                const selected_courses = await coursesModel.findById(coursesId)
                if (!selected_courses) {
                    response
                    .status(404)
                    .json({
                    sucess: false,
                    msg : `No se hallo el bootcamp con id:${coursesId}`
                    })
                
        }else{
        response
            .status(200)
            .json({
                "success":true ,
                "msg":selected_courses
                     
            })
        }
            }
        }catch(error){ response.status(500)
            .json({
                success:false,
                msg:"Error interno de servidor"
            }) }
        
        })
       
//crear courses
router.post('/', 
        async (request,response)=>{
            try {
                
        
            //crear el nuevo bootcamp
            const bootcamp = await coursesModel.
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

//actualizar courses por id

router.put('/:id',
        async (request, response)=> {
            try {
                const coursesId = request.params.id
                if(!mongoose.Types.ObjectId.isValid(coursesId)){
                    response
                    .status(500)
                    .json({
                    sucess: false,
                    msg: "Identificador invalido"
                        })

                }
                else{
                    const selected_courses =
                        await coursesModel.findByIdAndUpdate(
                            coursesId,
                            request.body,
                            {
                                new: true
                            }
                        )
    
                    if (!selected_courses){
                        response
                        .status(404)
                        .json({
                            sucess:false,
                            msg: `no se encontro el courses con id: ${coursesId}`
                        })
    
                    }else{
    
                    response
                        .status(200)
                        .json({
                            "success": true,
                            "results": selected_courses
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


//eliminar courses por id

    router.delete('/:id', 
    async(request,response)=>{
        try {
            
        
        //seleccionar id del bootcamp
        coursesId = request.params.id
        const DelCourse = await coursesModel.findByIdAndDelete(
            coursesId
        )
        response
            .status(200)
            .json({
                "success":true ,
                "result" : DelCourse
             
    })
    } catch (error) {
        response.status(500)
        .json({
            success:false,
            msg:error.message
        })
    }
    
})
module.exports=router