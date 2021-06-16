const mongoose=require('mongoose'),Schema=mongoose.Schema;
const bcrypt=require('bcrypt');

//Defining the Schema
const userSchema=new Schema({
    email: {
        type: String,
        required: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, 
                required: true,
                set:bcryptPassword
            }
})
//Bcrypt the password
function bcryptPassword(password){
    return bcrypt.hashSync(password,10)
}
//validating the password
userSchema.methods.validatePassword=async function(password){
    return await bcrypt.compare(password,this.password)
}
//Creating a Model
const User=mongoose.model('User',userSchema);
module.exports={User};