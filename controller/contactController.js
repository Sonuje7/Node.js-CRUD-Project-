

const asyncHandler = require("express-async-handler")
const Contact = require('../models/contactModels')

//@desc Get Contacts
//@route GEt /api/contacts/
//@access private
const getContacts = asyncHandler(async (req,res)=>{
    const contacts = await Contact.find({user_id: req.user.id})
    res.status(200).json(contacts)
})

//@desc Post Contacts
//@route post /api/contacts/
//@access private
const createContact = asyncHandler(async (req,res)=> {
    console.log("The request Body:", req.body)
    const {name, email, phone} = req.body;
    if(!name || !email || !phone)
    {
        res.status(400);
        throw new Error('All Fields Are Mandatory')
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    })
    res.status(201).json(contact)
})

//@desc get Contacts
//@route get /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req,res)=> {
    const contact = await Contact.findById(req.params.id);
    if(!contact)
    {
        res.status(404);
        throw new Error("Contact not found")
    }
    res.status(200).json(contact)
})

//@desc update Contacts
//@route put /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact)
    {
        res.status(404);
        throw new Error("Contact not found")
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.status(200).json(updatedContact)
})

//@desc Delete Contacts
//@route put /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    await Contact.deleteOne({_id: req.params.id});
    res.status(200).json(contact);
});

module.exports = { getContacts, getContact, createContact, updateContact, deleteContact }