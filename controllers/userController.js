const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//@desc register
//@routes POST
//@access public

const registerUser = asyncHandler(async (req, res) => {

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All Fields are Mandatory!")
    }

    const userAvailable = await User.findOne({ email })

    if (userAvailable) {
        res.status(400);
        throw new Error('Email Already Exists')
    }

    //hashed password
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log("hashedPassword", hashedPassword)


    const user = await User.create({
        username,
        email,
        password: hashedPassword
    })

    console.log(`User Created ${user}`);

    if (user) {
        res.status(201).json({ _id: user.id, email: user.email })
    }
    else {
        res.status(400);
        throw new Error("User Data is not Valid")
    }

    // res.json({ message: 'Register the user' })
})

//@desc login
//@routes POST
//@access public

const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("All Fields are Mandatory")
    }

    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1m" }
        )
        res.status(200).json({ accessToken })
    }
    else {
        res.status(401);
        throw new Error('Email or password is invalid')
    }
})

//@desc current user info
//@routes GET
//@access private

const currentUser = asyncHandler(async (req, res) => {
    res.json({ message: 'Current user' })
})

module.exports = { registerUser, loginUser, currentUser }