const express = require('express');
const router = express.Router();

const {
    signup,
    login,
    logout,
    getLoggedInUserDetail
} = require('../controllers/userController');


const { 
    getAllUsers,
    } = require('../controllers/adminController')

const { isSignedIn } = require('../middlewares/user')
const { isAdmin } = require('../middlewares/admin')
//User Routes
router.route('/signup').post(signup)
router.route('/login').post(login)
router.route('/logout').get(isSignedIn,logout)
router.route('/userProfile').get(isSignedIn,getLoggedInUserDetail)

//Admin Route
router.route('/admin/userList').get(isSignedIn,isAdmin,getAllUsers)






module.exports = router;