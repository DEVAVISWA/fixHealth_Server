const salesRouter= require('express').Router()
const bcrypt= require('bcrypt')
const Sale = require('../models/sale')

salesRouter.post('/', async(req,res)=>{
    const {salesName,salesEmail,salesPassword} = req.body
    const salesPasswordHash= await bcrypt.hash(salesPassword, 10)
    const sales= new Sale ({
        salesName,
        salesEmail,
        salesPasswordHash
    })
    const savedSales= await sales.save()
    res.json(savedSales)
})

module.exports= salesRouter