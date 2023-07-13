const express = require('express');
const router = express.Router();
const { getContacts, createContacts, getContact, updateContact, deleteContact } = require('../controllers/contactcontrollers');
const validateToken = require('../middleware/validateTokenHandler');


router.use(validateToken); // Validate token for all the routes

router.route("/").get(getContacts);

router.route("/").post(createContacts);

router.route("/:id").get(getContact);

router.route("/:id").put(updateContact);

router.route("/:id").delete(deleteContact)

module.exports = router;