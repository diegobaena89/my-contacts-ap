const ContactRepository = require('../repositories/ContactRepository');
const isValidUUID = require('../utils/isValidUUID');

class ContactController {
  async index(request, response) {
    const { orderBy } = request.query;

    const contacts = await ContactRepository.findAll(orderBy);

    response.json(contacts);
  }

  async show(request, response) {
    const { id } = request.params;

    if (!isValidUUID(id)) {
        return response.status(400).json({ error: 'Invalid UUID.' });
    }

    const contact = await ContactRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    response.json(contact);
  }

  async delete(request, response) {
    const { id } = request.params;

    if (!isValidUUID(id)) {
        return response.status(400).json({ error: 'Invalid category UUID.' });
    }

    await ContactRepository.delete(id);
    response.sendStatus(204);
  }

  async store(request, response) {
    const {
      name, email, phone, category_id,
    } = request.body;

    if (category_id && !isValidUUID(category_id)) {
        return response.status(400).json({ error: 'Invalid category UUID.' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const emailExists = await ContactRepository.findByEmail(email);

    if (emailExists) {
      return response.status(400).json({ error: 'This email is already been taken' });
    }

    const contact = await ContactRepository.create({
      name,
      email: email || null,
      phone,
      category_id: category_id || null,
    });

    response.status(201).json(contact);
  }

  async update(request, response) {
    const { id } = request.params;

    if (!isValidUUID(id)) {
        return response.status(400).json({ error: 'Invalid UUID.' })
    }

    const {
      name, email, phone, category_id,
    } = request.body;

    if (category_id && !isValidUUID(category_id)) {
        return response.status(400).json({ error: 'Invalid category UUID.' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const contactExists = await ContactRepository.findById(id);

    if (!contactExists) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    const contactByEmail = await ContactRepository.findByEmail(email);

    if (contactByEmail && contactByEmail.id !== id) {
      return response.status(400).json({ error: 'This email is already been taken' });
    }

    const updatedContact = await ContactRepository.update(id, {
      name,
      email: email || null,
      phone,
      category_id: category_id || null,
    });

    response.json(updatedContact);
  }
}

module.exports = new ContactController();
