const ContactService = require("./ContactService");
const { contactValidation } = require("./validate/contactValidate");

class ContactController {
  async create(req, res) {
    try {
      const { error } = contactValidation(req.body);
      if (error) {
        res.status(400).json(error.message);
        return new Error(error.message)
      }
      const newContact = await ContactService.create(req.body);
      res.status(201).json(newContact);
      return;
    } catch (e) {
      console.log(e);
      res.status(500).json(e.message);
      return;
    }
  }

  async getContact(req, res) {
    try {
      const contacts = await ContactService.getContacts();
      res.status(200).json(contacts);
    } catch (e) {
      console.log(e);
      res.status(500).json(e.message);
    }
  }

  async removeContact(req, res) {
    try {
      const id = req.params.id;
      const removedContact = await ContactService.removeContact(id);
      return res.status(200).json("contact deleted");
    } catch (e) {
      return res.status(500).json(e.message);
    }
  }

  async updateContact(req, res) {
    try {
      const { error } = contactValidation(req.body);
      if (error) {
        await res.status(400).json(error.message);
        return;
      }
      const id = req.params.id;
      const newContact = req.body;
      const updatedContact = await ContactService.updateContact(id, newContact);
      return res.status(200).json(updatedContact);
    } catch (e) {
      return res.status(500).json(e.message);
    }
  }
}

module.exports = new ContactController();
