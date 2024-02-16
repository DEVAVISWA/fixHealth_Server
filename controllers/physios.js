const physioRouter= require('express').Router()
const bcrypt= require('bcrypt')
const Physio = require('../models/physio')

physioRouter.post('/', async(req,res)=>{
    const{physioName,physioEmail, physioPassword} = req.body
    const physioPasswordHash= await bcrypt.hash(physioPassword, 10)
    const physio= new Physio({
        physioName,
        physioEmail,
        physioPasswordHash
    })
    const savedPhysio= await physio.save()
    res.json(savedPhysio)
})

module.exports= physioRouter