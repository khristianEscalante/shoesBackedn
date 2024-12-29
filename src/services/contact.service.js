const ContactRepository = require('../reposiroties/contac.repository');

class ContactService {
  async getAllContacts() {
    return await ContactRepository.findAll();
  }

  async getContactById(id) {
    const contact = await ContactRepository.findById(id);
    if (!contact) {
      throw new Error('Contact not found');
    }
    return contact;
  }

  async createContact(data) {
    return await ContactRepository.create(data);
  }

  async updateContact(id, data) {
    await this.getContactById(id); // Verifica que exista
    return await ContactRepository.update(id, data);
  }

  async deleteContact(id) {
    await this.getContactById(id); // Verifica que exista
    return await ContactRepository.delete(id);
  }
}

module.exports = new ContactService();
