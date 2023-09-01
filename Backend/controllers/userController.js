const User = require('../models/user');
const cookieToken = require('../utilities/cookieToken');


exports.signup = (async (req, res) => {
    try {

        const { name, email, password, role } = req.body;

        //check input parameters
        if (!name || !email || !password) {
            return res.status(400).json({
                message: 'Invalid name or email or password',
                success: false
            })
        }
        const user = await User.create({     
            name,   
            email,
            password,
            role
        })
        user.password = undefined
        
        cookieToken(user, res);
        return res.status(200).json({
            user
        })
    }
    catch (error) {
        console.log(error)
    }
});

exports.login = (async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Invalid",
                success: false
            })
        }

        const user = await User.findOne({ email }).select('+password');
        // return res.status(200).json({
        //     user
        // })
        if (!user) {
            return res.status(400).json({
                msg: "User Does'nt Exists",
                success: false
            })
        }

        const pass = await user.comparePassword(password);
        // return res.status(200).json({pass})
        if (!pass) {
            return res.status(400).json({
                msg: "Password Does'nt Match",
                success: false
            })
        }

        cookieToken(user, res);
        // return res.status(200).json({
        //     msg:"Logged In Successfully",
        //     success:true
        // })
    }
    catch (error) {
        console.log(error);
    }
})

exports.logout = (async (req, res) => {
    try {
        res.clearCookie('token', null, {
            expires: new Date(Date.now()),
            httpOnly: true
        }).status(200).json({
            success: true,
            message: "Logged Out Successfully"
        })
    } catch (error) {
        console.log(error)
    }
})

exports.getLoggedInUserDetail = (async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        return res.status(200).json({
            success: true,
            user
        })
    }
    catch (error) {
        console.log(error)
    }
})