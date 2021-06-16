const {User}=require('../Models/User');
const router=require('express').Router();
const jwt=require('jsonwebtoken');

//POST for SignUp
router.post('/signup',(req,res)=>{
    User.findOne({email:req.body.email})
    .exec(async(err,val)=>{
        if(err){
           return res.status(500).send({error:"Something went Wrong"})
        }
        if(val!==null){
            return res.send({error:"User already found"}) 
        }
        const newUser=await new User(req.body)
        newUser.save((errr,docs)=>{
            if(errr){
                if(errr.name==="ValidationError"){
                    return res.send({error:errr.message})
                }
                else{
                    return res.send({error:"Something went wrong"})
                }
            }
            res.send(docs)
        })
    })
})

//POST for signin
router.post('/signin',(req,res)=>{
    User.findOne({email:req.body.email})
    .exec(async(err,docs)=>{
        if(err){
            return res.status(500).send({error:"Something went wrong"})
        }
        if(docs===null){
            return res.send({error:"No user found"})
        }
        if(await docs.validatePassword(req.body.password)){
            const token=jwt.sign({_id:docs._id},process.env.SECRET);
            //Storing the jwt in httpOnly cookie for security purpose
            return res.cookie('token', token, {
                expires: new Date(new Date().getTime() + 100*1000),
                secure: false, 
                httpOnly: true
              }).send({user:docs});
        }
        else{
            res.send({error:"Incorrect Password"})
        }
    })
})

//verifying the jwt in the cookies by GET
router.get('/verify',async(req,res)=>{
    try{
        const token=req.cookies.token;
        if(!token){
            return res.status(404).send({error:"You need to login"})
        }
        jwt.verify(token, process.env.SECRET, function(err, decoded) {
            if(err){
                return res.status(404).send({error:"Invalid token"})
            }
            else{
                return res.send({message:token})
            }   
        });
    }
    catch(err){
        res.status(500).send({error:"Server error"})
    }
})

//GET for logout
router.get('/logout',(req,res)=>{
    res.status(200).clearCookie('token').send("Logout Success")
})

module.exports=router;