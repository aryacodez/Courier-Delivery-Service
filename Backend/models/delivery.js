const mongoose = require('mongoose');

const deliverySchema = mongoose.Schema({    
    deliveryMode:{
        type: String,
        //required: true,
        enum:['Within City','Intercity']
    },
    parcelType:{
        type: String,        
        //required: true,        
    },
    packageWeight:{
        type: String,
        //required:true,
        // enum:['Upto 1Kg','Upto 5Kg','Upto 10Kg','Upto 15Kg','Upto 20Kg','More than 20Kg'],
        default: 'Upto 1kg'
    },
    pickupLocation:{
        type: String,
        //required: true
    },
    dropLocation:{
        type: String,
        //required: true
    },
    totalPrice:{
        type: Number,
        //required: true
    },
    deliveryPrice:{
        type:Number,
        //required: true
    },
    gst:{
        type: Number,
        //required: true
    },
    insurance:{
        type: Number
    },
    paymentMode:{
        type: String,
        //required: true,
        enum:['UPI','COD','Debit/Credit Card','COP']
    },
    paymentInfo:{
        id:{
            type: String
        }
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref:'User',
        //required: true
    },
    status:{
        type: String,
        default: 'processing',
        //required: true
    },
    pickupMob:{
        type:Number,
       // required: true
    },
    dateTime:{
        type: String,
        //required:true
    },
    receiverName:{
        type:String,
       // required:true
    },
    receiverMob:{
        type:Number,
        //required:true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Delivery',deliverySchema);