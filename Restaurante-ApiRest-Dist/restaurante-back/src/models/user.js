const {Schema, model }= require('mongoose');

const userSchema= new Schema({
    name : String, 
    lastname : String, 
    phone : Number, 
    email: String,
    password: String,
    cash: Number,
    active: Boolean
}, {
    timestamps : true
});

module.exports = model('User',userSchema)