const express=require('express')
const reviewsModel = require('../models/ReviewsModels')
const  mongoose  = require('mongoose')
const router =express.Router()
//traer reviews
router.get('/', 
        async(request,response)=>{
            try{
            //TRAER TODOS LOS reviews 
            const  reviews =
                await reviewsModel.find()

                if(reviews.length === 0){
        
            return response
        
                .status(404)
                .json({
                    "success":false ,
                    "msg":"mo hay reviews disponibls"
                     
                })
            }
            response
            .status(201)
            .json({
                "success":true ,
                "results":reviews
                 
            })
            }catch(error){
            response.status(500)
            .json({
                success:false,
                msg:"Error interno de servidor"
            })
            }
        })
//traer reviews por id

router.get('/:id', 
    async(request,response)=>{
        try{
        //Traer el parametro id
        const reviewsId = request.params.id
            if(!mongoose.Types.ObjectId.isValid(reviewsId)){

                response.status(500)
                .json({
                    success:false,
                    msg:"Identificador invalido"
                })
            }else{
                const selected_reviews = await reviewsModel.findById(reviewsId)
                if (!selected_reviews) {
                    response
                    .status(404)
                    .json({
                    sucess: false,
                    msg : `No se hallo el reviews con id:${reviewsId}`
                    })
                
        }else{
        response
            .status(200)
            .json({
                "success":true ,
                "msg":selected_reviews
                     
            })
        }
            }
        }catch(error){ response.status(500)
            .json({
                success:false,
                msg:"Error interno de servidor"
            }) }
        
        })
       
//crear reviews
router.post('/', 
        async (request,response)=>{
            try {
                
        
            //crear el nuevo reviews
            const reviews = await reviewsModel.
                        create(request.body)
                        response
                        .status(201)
                        .json({
                            "success":true ,
                            "data": reviews 
                             
                        })

            } catch (error) {
                response.status(500)
            .json({
                success:false,
                msg:error.message
            })
            }
            
        })

//actualizar reviews por id

router.put('/:id',
        async (request, response)=> {
            try {
                const reviewsId = request.params.id
                if(!mongoose.Types.ObjectId.isValid(reviewsId)){
                    response
                    .status(500)
                    .json({
                    sucess: false,
                    msg: "Identificador invalido"
                        })

                }
                else{
                    const selected_reviews =
                        await reviewsModel.findByIdAndUpdate(
                            reviewsId,
                            request.body,
                            {
                                new: true
                            }
                        )
    
                    if (!selected_reviews){
                        response
                        .status(404)
                        .json({
                            sucess:false,
                            msg: `no se encontro el reviews con id: ${reviewsId}`
                        })
    
                    }else{
    
                    response
                        .status(200)
                        .json({
                            "success": true,
                            "results": selected_reviews
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

//eliminar reviews por id

    router.delete('/:id', 
    async(request,response)=>{
        try {
            
        
        //seleccionar id del reviews
        reviewsId = request.params.id
        const DelReviews = await reviewsModel.findByIdAndDelete(
            reviewsId
        )
        response
            .status(200)
            .json({
                "success":true ,
                "result" : DelReviews
             
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