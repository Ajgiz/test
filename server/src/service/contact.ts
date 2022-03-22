import { IContact, IContactInput } from '.././types/contact';
import Contact from '../model/contact'

class ContactService {
  async create(data: IContactInput) {
    const newContact = await Contact.create(data as any);
    return newContact;
  }

  async getContacts() {
    const contacts = await (await Contact.findAll())
    return contacts.reverse();
  }

  async removeContact(id: number) {
    const contact = await Contact.findByPk(id);
    await contact!.destroy();
    return "contact deleted";
  }

  async updateContact(id: number, data: IContactInput) {
    const contact: any = await Contact.findByPk(id);
    contact.username = data.username;
    contact.phone = data.phone;
    await contact.save();
    return contact;
  }
}

export default new ContactService()

