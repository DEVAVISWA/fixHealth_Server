const patientRouter= require('express').Router()
const bcrypt= require('bcrypt')
const Patient = require('../models/patient')

patientRouter.post('/', async(req,res)=>{
    const {patientName,patientEmail,patientPassword} = req.body
    const patientPasswordHash= await bcrypt.hash(patientPassword, 10)
    const patient= new Patient({
        patientName,
        patientEmail,
        patientPasswordHash
    })
    const savedPatient= await patient.save()
    res.json(savedPatient)
})

module.exports= patientRouter