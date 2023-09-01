const User = require('../models/user');
const Delivery = require('../models/delivery');

const cookieToken = require('../utilities/cookieToken');

exports.getAllUsers = (async(req,res)=>{
    try{
        const user = await User.find({role:'user'});
        if(user.length == 0){
            return res.status(404).json({
                message: "No user found"                
            })
        }
        return res.status(200).json({
            success: true,
            user
        })

    }catch(err){
        console.log(err);
    }
})


exports.getAllOrders = (async(req,res) => {
    try{
        const delivery = await Delivery.find();
        if(delivery.length == 0){
            return res.status(404).json({
                message:"No Deliveries Exist"
            })
        }
        return res.status(200).json({
            delivery,
            success:true
        })
    }catch(err) {
        console.log(err)
    }
})


exports.updateDeliveryStatus=(async (req, res) => {
    try{
        const delivery = await Delivery.findById(req.params.id)
        if(!delivery){
            return res.status(404).json({
                message: 'Delivery not found'
            })
        }
        delivery.status = req.body.status

        await delivery.save()
        return res.status(200).json({
            message:"Delivery status updated",
            delivery
        })
    }catch(err){
        console.log(err)
    }
})

exports.deliveryCancel = (async(req,res) => {
    try{
        const delivery = await Delivery.findById(req.params.id)
        if(!delivery){
            return res.status(404).json({message:"No such order exists"})
        }
        await delivery.remove()
        return res.status(200).json({message:"Order deleted successfully",success:true})
    }catch(err){console.log(err)}
})