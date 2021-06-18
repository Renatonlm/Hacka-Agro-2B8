const mongoose = require('mongoose')

const CartSchema = mongoose.Schema(
    {
        nome:{
            type: String,
            required : true,
        },
        preco:{
            type: Float32Array,
            required : true,
        },
        tipo:{
            type: String,
            required : true,
        },
        email:{
            type: String,
            required : true,
        }
    }
)

module.exports = mongoose.model('CartModel', CartSchema)