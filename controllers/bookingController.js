const { err } = require('../Utils/logger')
const Booking = require('../models/booking')
const User = require('../models/user')
const bookingRouter= require('express').Router()

bookingRouter.post('/physio/createBooking', async (req,res)=>{
    const{email,name,filter,slotTime,slotNo} = req.body
    //authorization ??

    const user= await User.findOne({email})
    if (!user) {
        return res.status(401).json({ message: 'user does not exist' })
    }
    const booking= new Booking({
        email:email,
        name:name,
        filter:filter,
        slotTime:slotTime,
        slotNo:slotNo
    })
    await booking.save()
    res.status(200).json({
        email,
        name:booking.name,
        filter,
        slotTime,
        slotNo
    })
})

bookingRouter.post('/sales/slotAllocation', async(req,res)=>{
    const{name,slot_confirmed , remarks} = req.body
    //authorization ??

    const user=await User.findOne({name})
    if (!user) {
        return res.status(401).json({ message: 'user does not exist' })
    }
    const slotAllocation= new Booking({
        name,
        slot_confirmed,
        remarks
    })
    await slotAllocation.save()
    res.status(200).json({
        name,
        slot_confirmed,
        remarks
    })
})

//ERR !! in viewing physios slot
// bookingRouter.get('/physio/viewSlots' , async(req,res) =>{
//     try{
//         const slots= await User.find().populate('slot')
//         res.json(slots)
//     } catch(e) {
//         err(e)
//     }
// })

module.exports= bookingRouter