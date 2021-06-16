const mongoose=require('mongoose'),Schema=mongoose.Schema;

//Defining the Schema
const exerciseSchema=new Schema({
   date:{type:String},
   type:{type:String},
   duration:{type:String},
   feedback:{type:String},
   user_id:{type:String}
})

//Creating a Model
const Exercise=mongoose.model('Exercise',exerciseSchema);
module.exports={Exercise};