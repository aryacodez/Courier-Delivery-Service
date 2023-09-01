const Counter = require('../models/counter');

// exports.saveCount = (async (req, res) => {
//     try {
//         const count = await Counter.findOne({user: req.user._id})
//         if(!count){
//             const countCreate = await Counter.create({
//                 user: req.user._id,
//                 presentCounter:1,                
//             })            
//             res.status(200).json({
//                 success: true,
//                 countCreate
//             })
//         }
//         count.presentCounter+=1;
//         await count.save();
//         res.status(200).json({
//             success: true,
//             count
//         })
//     } catch (err) {
//         console.log(err)
//     }
// })

// exports.cancelCount = (async (req, res) => {
//     try {
               
//         const counter = await Counter.findOne({user:req.user._id});
//         if(counter.length===0){
//             return res.status(404).json({
//                 success:'false',
//                 msg:'Counter do not exists'
//             })
//         }
//         counter.cancelCounter+=1;
//         counter.presentCounter-=1;
//         await counter.save()

//         res.status(200).json({
//             success: true,
//             counter
//         })
//     } catch (e) {
//         console.log(e)
//     }
// })

exports.getSaveCount = (async (req, res) => {
    try{
        const getSave = await Counter.find({user:req.user._id})
        if(getSave.length===0){
            return res.status(400).json({
                success:false,
                msg: "0"
            })
        }
        res.status(200).json({
            success:'true',
            getSave
        })
    }catch(e){
        console.log(e);
    }
})