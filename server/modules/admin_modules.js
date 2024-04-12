const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const adminSignUpSchema = Schema({
    admin_name:{
        type:String,
        required:true
    },
    admin_dept:{
        type:String,
        required:true
    },
    admin_email:{
        type:String,
        required:true
    },
    admin_phoneNum:{
        type:Number,
        required:true
    },
    admin_password:{
        type:String,
        required:true
    }
})

const volunteerSchema = Schema({
    vol_id:{
        type:String,
        required:true
    },
    startDate:{
        type:Date,
        required:true
    },
    endDate:{
        type:Date,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    activity:{
        type:String,
        required:true
    },
    slot_available:{
        type:Number,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})
module.exports.adminSignUp = mongoose.model("adminsignUp",adminSignUpSchema);
module.exports.volunteerActivity = mongoose.model("volunteerActivity",volunteerSchema)