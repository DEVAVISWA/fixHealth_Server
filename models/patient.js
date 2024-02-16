const { default: mongoose } = require("mongoose");

const patientSchema= new mongoose.Schema({
    patientName: String,
    patientEmail: String,
    patientPasswordHash: String,
    createdAt:{
        type: Date,
        default: Date.now
    }
})

const Patient= mongoose.model('Patient', patientSchema, 'patients')

module.exports=  Patient