const physioLoginRouter= require('express').Router()
const bcrypt= require('bcrypt')
const jwt= require('jsonwebtoken')
const Physio = require('../models/physio')
const { JWT_SECRET } = require('../Utils/config')

physioLoginRouter.post('/', async(req,res)=>{
    const{ physioEmail,physioPassword }= req.body
    const physio= await Physio.findOne({physioEmail})
    if(!physio){
        return res.status(401).json({message:'physio with these detail does not exit'})
    }
    const isAuth= await bcrypt.compare(physioPassword, physio.physioPasswordHash)
    if(!isAuth){
        return res.status(400).json({message:'password does not match'})
    }
    const jwtPayload={
        physioName: physio.physioName,
        id: physio._id
    }
    const token= jwt.sign(jwtPayload,JWT_SECRET, {expiresIn:'5h'})
    res.status(200).json({
        token,
        physioName: physio.physioName,
        physioEmail: physio.physioEmail
    })
})

module.exports=physioLoginRouter