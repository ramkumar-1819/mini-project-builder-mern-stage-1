//Exporting the required modules
const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const env=require('dotenv');
const mongoose=require('mongoose');
const cokkieParser=require('cookie-parser');

const app=express();
env.config()

//DB connection
mongoose.connect(process.env.URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false,
    useCreateIndex:true
})
.then(ok=>console.log("Connection made to DB"))
.catch(err=>console.log("Failed to connect to DB"))

//Getting the Routes
const userRoute=require('./Routes/User');
const exerciseRoute=require('./Routes/Exercise');

app.use(cors({origin:"http://localhost:3000",credentials:true}))
app.use(cokkieParser())
app.use(bodyParser.json())
app.use('/',userRoute);
app.use('/',exerciseRoute);
const about=`This is One of the Greatest Exersise Tracking app and in this app user can
             input the exersice that he/she has done on that day and we keep track of all the exersice
             that user did on every day.By this user can find the exercise details that he/she did in the past
             and user can able to delete or edit the exercise`

app.get('/about',(req,res)=>{
    res.send({message:about})
})

app.listen(process.env.PORT,()=>console.log(`Server Started at PORT ${process.env.PORT}`))
