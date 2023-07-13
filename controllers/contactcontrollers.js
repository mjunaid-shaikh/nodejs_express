const asyncHandler = require('express-async-handler');
const contacts = require('../models/contactModel');


//@desc get all contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
      const contact = await contacts.find({ user_id: req.user.id })
      res.status(200).json(contact)
});


//@desc create new contacts
//@route CREATE /api/contacts
//@access private
const createContacts = asyncHandler(async (req, res) => {
      const { name, email, phone } = req.body;

      if (!name || !email || !phone) {
            res.status(400);
            throw new Error("All the feilds are mendatory!")
      }

      const contact = await contacts.create({
            name,
            email,
            phone,
            user_id: req.user.id
      });
      res.status(201).json(contact);

});


//@desc get new contact
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req, res) => {
      const contact = await contacts.findById(req.params.id)
      if (!contact) {
            res.status(400);
            throw new Error("Contact not found");
      }
      res.status(200).json(contact);
});


//@desc update contacts
//@route UPDATE /api/contacts
//@access private
const updateContact = asyncHandler(async (req, res) => {
      const contact = await contacts.findById(req.params.id);
      if (!contact) {
            res.status(404);
            throw new Error('Contact not found');
      }

      if (contact.user_id.toString() !== req.user.id) {
            res.status(403);
            throw new Error('User does not have permission for other user update')
      }

      const updatedContact = await contacts.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
      )
      res.status(200).json(updatedContact)
});


//@desc update contacts
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
      let contact = await contacts.findById(req.params.id);
      console.log('check one', contact);
      if (!contact) {
            res.status(404);
            throw new Error('Contact not deleted');
      }

      if (contact.user_id.toString() !== req.user.id) {
            res.status(403);
            throw new Error('User does not have permission for other user update')
      }

      await contacts.deleteOne({ _id: req.params.id });
      res.status(200).json(contact);
});



module.exports = { getContacts, createContacts, getContact, updateContact, deleteContact }