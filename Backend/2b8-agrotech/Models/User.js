const mongoose = require('mongoose')

const UserSchema = mongoose.Schema(
    {
        nome:{
            type: String,
            required : true,
        },
        username:{
            type: String,
            required : true,
        },
        senha:{
            type: String,
            required : true,
        },
        email:{
            type: String,
            required : true,
        },
        cidade:{
            type: String
        }
    }
)

module.exports = mongoose.model('UserModel', UserSchema)