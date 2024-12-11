const mongoose = require('mongoose');

const contactSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "user"
        },
        name: {
            type: String,
            required: [true, "Please add Name"]
        },
        email: {
            type: String,
            required: [true, "Please add email"]
        },
        phone: {
            type: String,
            required: [true, "Please Add phone number"]
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Contact', contactSchema)