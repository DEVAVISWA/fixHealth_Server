const userRouter= require('express').Router()
const bcrypt= require('bcrypt')
const User = require('../models/user');
const { JWT_SECRET } = require('../Utils/config');
const jwt= require('jsonwebtoken')

userRouter.post('/signup', async(req,res)=>{
    const {name,email,password, userType } = req.body
    const passwordHash= await bcrypt.hash(password, 10);
    const user= new User({
        name,
        email,
        passwordHash,
        user_type: userType
    })
   await user.save()
    res.json({message:"User Created Successfully!"}).status(200)
});

userRouter.post('/login', async (req,res)=>{
    const{ email,password }= req.body
    const user= await User.findOne({email})
    if(!user){
        return res.status(401).json({message:'User with these detail does not exist'})
    }
    const isAuth = bcrypt.compare(password, user.passwordHash)
    if(!isAuth){
        return res.status(401).json({message:'password does not match'})
    }
    const jwtPayload={
        name: user.name,
        id: user._id,
        userType: user.user_type
    }
    const token= jwt.sign(jwtPayload,JWT_SECRET, {expiresIn:'5h'})
    res.status(200).json({
        token,
        name: user.name,
        email: user.email,
        userType: user.user_type
    })
});

module.exports= userRouter;