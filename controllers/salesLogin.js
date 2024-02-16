const salesLoginRouter= require('express').Router()
const bcrypt= require('bcrypt')
const jwt= require('jsonwebtoken')
const { JWT_SECRET } = require('../Utils/config')
const Sale = require('../models/sale')

salesLoginRouter.post('/', async (req,res)=>{
    const{ salesEmail,salesPassword }= req.body
    const sales= await Sale.findOne({salesEmail})
    if(!sales){
        return res.status(401).json({message:'sales team with these detail does not exit'})
    }
    const isAuth= await bcrypt.compare(salesPassword, sales.salesPasswordHash )
    if(!isAuth){
        return res.status(400).json({message:'password does not match'})
    }
    const jwtPayload={
        salesName: sales.salesName,
        id: sales._id
    }
    const token= jwt.sign(jwtPayload,JWT_SECRET, {expiresIn:'5h'})
    res.status(200).json({
        token,
        salesName: sales.salesName,
        salesEmail: sales.salesEmail
    })
})

module.exports=salesLoginRouter