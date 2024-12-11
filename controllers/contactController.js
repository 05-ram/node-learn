const asyncHandler = require('express-async-handler')
const Contact = require('../models/contactModel');

//@desc Get all contacts
//@routes GET
//@access public

const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id });
    res.status(200).json(contacts);
})

//@desc create New Contact
//@routes POST
//@access public

const createContact = asyncHandler(async (req, res) => {
    console.log('post from the client', req.body)
    const { name, email, phone } = req.body
    if (!name || !phone || !email) {
        res.status(400)
        throw new Error("All fields are Mandatory!")
    }

    const contact = await Contact.create({
        name, email, phone, user_id: req.user.id
    })

    res.status(201).json(contact)
})

//@desc create New Contact
//@routes POST
//@access public

const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found")
    }
    res.status(200).json(contact)
})

//@desc update New Contact
//@routes UPDATE
//@access public

const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found")
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to update others")
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )

    res.status(200).json(updatedContact)
})

//@desc delete New Contact
//@routes DELETE
//@access public

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found")
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to delete others")
    }
    await Contact.deleteOne({ _id: req.params.id });
    res.status(200).json(contact)
})

module.exports = { getContacts, getContact, createContact, updateContact, deleteContact }