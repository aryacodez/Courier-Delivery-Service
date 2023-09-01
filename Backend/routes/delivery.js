const express = require('express')
const router = express.Router()

const {
    createDelivery,
    getMyOrders,
    cancelMyDelivery,
    getMonthWiseDelivery,
    countDelivery} = require('../controllers/deliveryController');
const {isSignedIn} = require('../middlewares/user')
const { isAdmin } = require('../middlewares/admin')
const { 
    getAllOrders,
    updateDeliveryStatus,
    deliveryCancel } = require('../controllers/adminController')

    //isSignedIn,
//User Delivery Route
router.route('/createDelivery').post(isSignedIn,createDelivery);
router.route('/myorder').get(isSignedIn,getMyOrders);
router.route('/cancel/:id').delete(isSignedIn,cancelMyDelivery); //isSignedIn
router.route('/getMonthWise/:year/month-wise').get(isSignedIn,getMonthWiseDelivery); 
router.route('/countdelivery').get(isSignedIn,countDelivery)

//Admin Delivery Route
router.route('/admin/deliveries').get(isSignedIn,isAdmin,getAllOrders)
router.route('/admin/delivery/:id').put(isSignedIn,isAdmin,updateDeliveryStatus)
router.route('/admin/delivery/cancel/:id').get(isSignedIn,isAdmin,deliveryCancel)

module.exports = router