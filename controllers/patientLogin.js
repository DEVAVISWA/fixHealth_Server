const Patient = require('../models/patient')
const patientLoginRouter= require('express').Router()
const bcrypt= require('bcrypt')
const jwt= require('jsonwebtoken')
const { JWT_SECRET } = require('../Utils/config')

patientLoginRouter.post('/', async(req,res)=>{
    const{ patientEmail,patientPassword }= req.body
    const patient= await Patient.findOne({patientEmail})
    if(!patient){
        return res.status(401).json({message:'patient with these detail does not exit'})
    }
    const isAuth= await bcrypt.compare(patientPassword, patient.patientPasswordHash)
    if(!isAuth){
        return res.status(400).json({message:'password does not match'})
    }
    const jwtPayload={
        patientName: patient.patientName,
        id: patient._id
    }
    const token= jwt.sign(jwtPayload,JWT_SECRET, {expiresIn:'5h'})
    res.status(200).json({
        token,
        patientName: patient.patientName,
        patientEmail: patient.patientEmail
    })
})

module.exports=patientLoginRouter