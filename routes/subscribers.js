const express =require('express')
const subscriber = require('../models/subscriber')
const router=express.Router()
const Subscriber=require('../models/subscriber')
//Getting all
router.get('/',async (req,res)=>{
    try{
     const subscribers=await Subscriber.find()
     res.json(subscribers)
    }catch(e){
       res.status(500).json({message:e.message})
    }
})

//GettingOne
router.get('/:id',getSubscriber,(req,res)=>{
    res.json(res.subscriber)
})

//creating one
router.post('/',async(req,res)=>{
    const subscriber=new Subscriber({
        name:req.body.name,
        subscriberToChannel:req.body.subscriberToChannel
       
    })

    try{
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)
       }catch(e){
        res.status(400).json({message:e.message})
       }

})

//updatibng one
router.patch('/:id',getSubscriber,async(req,res)=>{
    if(req.body.name!=null){
        res.subscriber.name=req.body.name
    }
    if(req.body.subscriberToChannel!=null){
        res.subscriber.subscriberToChannel=req.body.subscriberToChannel
    }

    try{
     const updatedSusbcriber= await res.subscriber.save()
     res.json({updatedSusbcriber})
    }catch(e){
        res.status(400).json({
            message:e.message
        })

    }
})

//deleting one
router.delete('/:id',getSubscriber,async(req,res)=>{
 try{
   await res.subscriber.remove()
   res.json({
    message:"Deleted Subscriber"
   })
 }catch(er){
    res.status(500).json({
        message:er.message
    })
 }
})

async function getSubscriber(req,res,next){
    let subscriber
try{
subscriber=await Subscriber.findById(req.params.id)
if(subscriber==null){
    return res.status(404)({message:"Cannot find Subscriber"})
}
}catch(e){
return res.status(500).json({message:e.message})
}
res.subscriber=subscriber
next()
}
module.exports=router