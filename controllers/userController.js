const asyncHandler = require('express-async-handler');

//@desc register
//@routes POST
//@access public

const registerUser = asyncHandler(async (req, res) => {
    res.json({ message: 'Register the user' })
})

//@desc login
//@routes POST
//@access public

const loginUser = asyncHandler(async (req, res) => {
    res.json({ message: 'Login the user' })
})

//@desc current user info
//@routes GET
//@access private

const currentUser = asyncHandler(async (req, res) => {
    res.json({ message: 'Current user' })
})

module.exports = { registerUser, loginUser, currentUser }