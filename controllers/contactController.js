//@desc Get all contacts
//@routes GET
//@access public

const getContacts = (req, res) => {
    res.status(200).json({ message: "Get All Contacts" })
}

//@desc create New Contact
//@routes POST
//@access public

const createContact = (req, res) => {
    console.log('post from the client', req.body)
    const { name, skill, years } = req.body
    if (!name || !skill || !years) {
        res.status(400)
        throw new Error("All fields are Mandatory!")
    }
    res.status(201).json({ message: "Create Contact" })
}

//@desc create New Contact
//@routes POST
//@access public

const getContact = (req, res) => {
    res.status(200).json({ message: `Get Contact for ${req.params.id}` })
}

//@desc update New Contact
//@routes UPDATE
//@access public

const updateContact = (req, res) => {
    res.status(200).json({ message: `Update contact for ${req.params.id}` })
}

//@desc delete New Contact
//@routes DELETE
//@access public

const deleteContact = (req, res) => {
    res.status(200).json({ message: `Delete contact for ${req.params.id}` })
}

module.exports = { getContacts, getContact, createContact, updateContact, deleteContact }