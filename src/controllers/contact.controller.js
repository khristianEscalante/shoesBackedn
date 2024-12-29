const ContactService = require('../services/contact.service');

class ContactController {
  async getAll(req, res) {
    try {
      const Contacts = await ContactService.getAllContacts();
      res.status(200).json(Contacts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const Contact = await ContactService.getContactById(req.params.id);
      res.status(200).json(Contact);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async create(req, res) {
    try {
      const Contact = await ContactService.createContact(req.body);
      res.status(201).json(Contact);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const Contact = await ContactService.updateContact(req.params.id, req.body);
      res.status(200).json(Contact);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      await ContactService.deleteContact(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new ContactController();
