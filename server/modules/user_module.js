const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSignUpSchema = Schema({
    user_rollno:{
        type:String,
        required:true
    },
    user_name:{
        type:String,
        required:true
    },
    user_dept:{
        type:String,
        required:true
    },
    user_year:{
        type:Number,
        required:true
    },
    user_email:{
        type:String,
        required:true
    },
    user_password:{
        type:String,
        required:true
    }
})
const activityRegistrationSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true
    },
    vol_id: {
        type: String,
        required: true
    },
    registrationDate: {
        type: Date,
        default: Date.now
    }
});

module.exports.userSignUp = mongoose.model("userSignUp",userSignUpSchema);
module.exports.ActivityRegistration = mongoose.model('ActivityRegistration', activityRegistrationSchema);
// module.exports.VolunteerActivity = mongoose.model('VolunteerActivity', volunteerSchema);
// module.exports.volRegister = mongoose.model("volRegister",volRegisterSchema);