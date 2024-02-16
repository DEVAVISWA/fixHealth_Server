const { default: mongoose } = require("mongoose");

const salesSchema= mongoose.Schema({
    salesName: String,
    salesEmail: String,
    salesPasswordHash: String,
    createdAt:{
        type: Date,
        default: Date.now
    }
})

const Sale= new mongoose.model('Sale', salesSchema, 'sales')

module.exports= Sale