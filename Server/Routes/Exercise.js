const {Exercise}=require('../Models/Exercise');
const router=require('express').Router();
const ObjectId=require('mongoose').Types.ObjectId;

//GET for getting user data
router.get('/getdata/:id',(req,res)=>{
    Exercise.find({user_id:req.params.id})
    .exec(async(err,docs)=>{
        if(err){
            res.sendStatus(403)
        }
        res.send(docs)
    })
})

//POST for new exersice
router.post('/newexercise',(req,res)=>{
    const newExercise=new Exercise(req.body);
    newExercise.save((err,docs)=>{
        if(err){
                return res.sendStatus(403)
        }
        Exercise.find({user_id:req.body.user_id})
        .exec((err,docs)=>{
            if(err){
                res.sendStatus(403)
            }
            else{
                res.send(docs)
            }
        })
    })
})
//PUT for updating exercise
router.put('/updateexercise/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        return res.status(404).json({error:"Invalid Id"})
    }
    const updatedExercise=req.body;
    Exercise.findByIdAndUpdate(req.params.id,{$set:updatedExercise},{new:true},(err,docs)=>{
        if(err){
            return res.status(500).json({error:"Internal Server Error"})
        }
        Exercise.find({user_id:req.body.user_id})
        .exec((err,docs)=>{
            if(err){
                res.sendStatus(403)
            }
            else{
                res.send(docs)
            }
        })
    })
})
//DELETE for deleting the exercise
router.delete('/deleteexercise/:id/:user_id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        return res.status(404).json({error:"Invalid Id"})
    }
    Exercise.findByIdAndRemove(req.params.id,(err,docs)=>{
        if(err){
            return res.status(500).json({error:"Internal Server Error"})
        }
        Exercise.find({user_id:req.params.user_id})
        .exec((err,doc)=>{
            if(err){
                res.sendStatus(403)
            }
            else{
                res.send(doc)
            }
        })
    })
})
module.exports=router;