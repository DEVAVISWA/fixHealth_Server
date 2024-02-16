const express= require('express')
const cors= require('cors')
const patientRouter = require('./controllers/patients')
const physioRouter = require('./controllers/physios')
const salesRouter = require('./controllers/sales')
const patientLoginRouter = require('./controllers/patientLogin')
const physioLoginRouter = require('./controllers/physioLogin')
const salesLoginRouter = require('./controllers/salesLogin')

const app= express()

app.use(cors())
app.use(express.json())

app.get('/' , (req,res)=>{
    res.send('<h2> <span style="color:rgb(0,172,193);">fix_health </span> project by G. Deva Viswa </h2>')
})

//I didnt implement Role Based Access sytem , because all of them are not from the same organization
//RBAS is recommended when multiple people (Like Admin, SeniorEngineer,Junior Engineer) from the same Org with different power try to acces the same page
app.use('/api/patient/signup', patientRouter)
app.use('/api/physio/signup', physioRouter)
app.use('/api/sales/signup',salesRouter)
app.use('/api/patient/login',patientLoginRouter)
app.use('/api/physio/login',physioLoginRouter)
app.use('/api/sales/login',salesLoginRouter)

module.exports= app