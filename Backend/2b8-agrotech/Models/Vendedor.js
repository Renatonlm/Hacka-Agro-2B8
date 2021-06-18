const mongoose = require('mongoose')

const VendedorSchema = mongoose.Schema(
    {
        nome:{
            type: String,
            required : true,
        },
        cidade:{
            type: String,
            required : true,
        },
        organico:{
            type: Boolean,
            required : true,
        },
        produtos:{
            type: String,
            required : true,
        }
    }
)

module.exports = mongoose.model('VendedorModel', VendedorSchema)