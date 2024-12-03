const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please Enter the Name"],
        },
        email: {
            type: String,
            required: [true, "Please Enter the Email"],
            unique: [true, "Email Already Exists"] //already user reg with same email
        },
        password: {
            type: String,
            required: [true, "Please Enter the Password"]
        }
    },
    {
        timeStamps: true
    }
)

module.exports = mongoose.model("user", userSchema)