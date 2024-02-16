const express= require('express')
const cors= require('cors')
const patientRouter = require('./controllers/patients')
const physioRouter = require('./controllers/physios')
const salesRouter = require('./controllers/sales')

const app= express()

app.use(cors())
app.use(express.json())

app.get('/' , (req,res)=>{
    res.send('<h2> <span style="color:rgb(0,172,193);">fix_health </span> project by G. Deva Viswa </h2>')
})

app.use('/api/patient/signup', patientRouter)
app.use('/api/physio/signup', physioRouter)
app.use('/api/sales/signup',salesRouter)

module.exports= app