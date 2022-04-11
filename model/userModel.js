const mongoose = require('mongoose');
const {Schema,model} = mongoose;

const UserSchema = new Schema({
    username : {
        type:String,
        required:true
    },
    googleID : {
        type:String,
        required:true
    },
    userSearch : [{type:String}]
})

const User = model('User',UserSchema)

module.exports = {User}