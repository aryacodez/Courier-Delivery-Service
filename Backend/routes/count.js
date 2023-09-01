const express = require('express')
const router = express.Router()

const {getSaveCount} = require('../controllers/countController');
const {isSignedIn} = require('../middlewares/user')

router.route('/get-count').get(isSignedIn,getSaveCount);

module.exports = router;