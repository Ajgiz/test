import ContactService from '../service/contact'
import { IContactInput } from '../types/contact';
import { contactValidation } from '../validate/contact';
import { Request, Response } from 'express'

class ContactController {
  async create(req: Request, res: Response) {
    try {
      const { error } = contactValidation(req.body);
      if (error) {
        res.status(400).json(error.message);
        return new Error(error.message)
      }
      const newContact = await ContactService.create(req.body);
      res.status(201).json(newContact);
      return;
    } catch (e:any) {
      console.log(e);
      res.status(500).json(e.message);
      return;
    }
  }

  async getContact(req:Request, res:Response) {
    try {
      const contacts = await ContactService.getContacts();
      res.status(200).json(contacts);
    } catch (e:any) {
      console.log(e);
      res.status(500).json(e.message);
    }
  }

  async removeContact(req:Request, res:Response) {
    try {
      const id = +req.params.id;
      const removedContact = await ContactService.removeContact(id);
      return res.status(200).json("contact deleted");
    } catch (e:any) {
      return res.status(500).json(e.message);
    }
  }

  async updateContact(req:Request, res:Response) {
    try {
      const { error } = contactValidation(req.body);
      if (error) {
        await res.status(400).json(error.message);
        return;
      }
      const id = +req.params.id;
      const newContact:IContactInput = req.body;
      const updatedContact = await ContactService.updateContact(id, newContact);
      return res.status(200).json(updatedContact);
    } catch (e:any) {
      return res.status(500).json(e.message);
    }
  }
}

export default new ContactController();
