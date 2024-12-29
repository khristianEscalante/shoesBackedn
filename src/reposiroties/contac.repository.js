const { Contact } = require('../../models');

class ContactRepository {
  async findAll() {
    return await Contact.findAll();
  }

  async findById(id) {
    return await Contact.findByPk(id);
  }

  async create(ContactData) {
    return await Contact.create(ContactData);
  }

  async update(id, ContactData) {
    return await Contact.update(ContactData, { where: { id } });
  }

  async delete(id) {
    return await Contact.destroy({ where: { id } });
  }
}

module.exports = new ContactRepository();
