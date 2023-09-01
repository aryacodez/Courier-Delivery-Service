const Delivery = require('../models/delivery');
const sms = require('../utilities/sendMessage')
const Counter = require('../models/counter')

exports.createDelivery = (async (req, res) => {
    try {
        const {
            deliveryMode,
            //parcelType,
            packageWeight,
            pickupLocation,
            dropLocation,
            totalPrice,
            deliveryPrice,
            gst,
            insurance,
            paymentMode,
            paymentInfo,
            pickupMob,
            dateTime,
            receiverName,
            receiverMob,
        } = req.body

        //const counter = await Delivery.findOneAndUpdate({}, { $inc: {presentCounter:1}},{upsert:'true',new:'true'});
        const delivery = await Delivery.create({
            deliveryMode,
            //parcelType,
            packageWeight,
            pickupLocation,
            dropLocation,
            totalPrice,
            deliveryPrice,
            gst,
            insurance,
            paymentMode,
            paymentInfo,
            pickupMob,
            dateTime,
            receiverName,
            receiverMob,
            user: req.user._id,
        })

        sms(pickupMob);

        res.status(200).json({
            success: true,
            delivery
        })
    }
    catch (err) { console.log(err) }
})

exports.getMyOrders = (async (req, res) => {
    try {
        const order = await Delivery.find({ user: req.user._id }) //Delivery.find({user:req.user._id})
        if (!order) {
            return res.status(500).json({
                success: false,
                message: 'No order available'
            })
        }
        return res.status(200).json({
            success: true,
            order
        })
    } catch (err) { console.log(err) }
})

exports.cancelMyDelivery = (async (req, res) => {
    try {
        const order = await Delivery.findById(req.params.id);
        const cancelCount = await Counter.find({user:req.user._id})
        if (!order) {
            return res.status(404).json({ message: 'Order does not exist' });
        }
        
        if(cancelCount.length===0){
            const newCounter = new Counter({
                user:req.user._id,
                cancelCounter:1
            })
            await newCounter.save();
        }else{
            const counter = cancelCount[0];
            counter.cancelCounter +=1
            await counter.save()
        }
        
        await order.remove();
        res.status(200).json({
            message: "Order Cancelled.",
            success: true,
            order,
            counter: cancelCount.cancelCounter
        })
    } catch (err) { console.log(err) }
})

exports.getMonthWiseDelivery = (async (req, res) => {
    const year=parseInt(req.params.year);
    const pipeline=[
        {
            $match:{
                createdAt:{
                    $gte: new Date(`${year}-01-01`),
                    $lt: new Date(`${year+1}-01-01`)
                }
            }
        },
        {
            $group:{
                _id:{
                    $month: '$createdAt'
                },
                count:{
                    $sum: 1
                }
            }
        },
        {
            $project:{
                month:'$_id',
                count:1,
                _id: 0
            }
        },
        {
            $sort:{
                month: 1
            }
        }
    ]
    try{
        const result = await Delivery.aggregate(pipeline)
        const formattedresult = result.map(val=>{
            const month=new Date(`${year}-${val.month}-01`).toLocaleString('default', { month: 'long' });
            return{
                count: val.count,
                month: month
            }
        })
        res.status(200).json(formattedresult)
    }catch(e){
        console.log(e)
    }
})

exports.countDelivery = (async (req,res)=>{
    try{
        const delivery = await Delivery.find({user:req.user._id})
        let count = 0
        count = delivery.length
        res.status(200).json({
            success:true,
            count
        })
    }catch(e){
        console.log(e)
    }
})