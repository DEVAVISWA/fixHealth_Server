const userRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { JWT_SECRET } = require("../Utils/config");
const jwt = require("jsonwebtoken");

userRouter.post("/signup", async (req, res) => {
  const { name, email, password, userType } = req.body;

  User.findOne({name})
  if(!name){

  

  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({
    name,
    email,
    passwordHash,
    user_type: userType,
  });
  await user.save();
  res.json({ message: "User Created Successfully!" }).status(200);
} else {
  res.json({message:"User alredy exist"})
}
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(200)
      .json({ message: "User with these detail does not exist", error: true });
  }
  const isAuth = bcrypt.compare(password, user.passwordHash);
  if (!isAuth) {
    return res
      .status(200)
      .json({ message: "password does not match", error: true });
  }
  const jwtPayload = {
    name: user.name,
    id: user._id,
    userType: user.user_type,
  };
  const token = jwt.sign(jwtPayload, JWT_SECRET, { expiresIn: "5h" });
  res.status(200).json({
    token,
    name: user.name,
    email: user.email,
    userType: user.user_type,
    error: false,
  });
});

userRouter.get("/get_physio_list", async (_req, res) => {
  try {
    const physios = await User.find(
      { user_type: "physio" },
      { email: 1, name: 1 }
    );
    res
      .json({ error: false, message: "Physio list fetched", data: physios })
      .status(200);
  } catch (error) {
    err(error);
    res
      .json({
        message: `unable to fetch physio details - ERROR:${error.message}`,
        error: true,
      })
      .status(500);
  }
});

userRouter.get("/get_patient_list",async(_req,res)=>{
  try{
    const patient= await User.find(
      {user_type: "patient"},
      {email:1,name:1}
    )
    res 
      .json({ error: false, message: "Patient list fetched", data: patient })
      .status(200)
  } catch(error) {
    err(error)
    res
      .json({
        message: `unable to fetch patients details - ERROR:${error.message}`,
        error: true,
      })
      .status(500)
  }
})

module.exports = userRouter;
