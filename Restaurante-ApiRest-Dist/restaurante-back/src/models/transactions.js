const {Schema, model }= require('mongoose');

const transSchema= new Schema({
    transmitter : String, 
    receiver : String, 
    value : Number,
    reference : String, 
}, {
    timestamps : true
});

module.exports = model('Transaction',transSchema)