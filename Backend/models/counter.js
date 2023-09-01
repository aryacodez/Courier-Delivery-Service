const mongoose = require('mongoose');

const counterSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.ObjectId,
        ref:'User',
        //required: true
    },
    presentCounter:{
        type:Number,
        default:0
    },
    cancelCounter:{
        type:Number,
        default:0
    }
})

module.exports = mongoose.model('Counter',counterSchema);