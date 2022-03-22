import { Router } from 'express';
import ContactController from './controller/contact';

const router:Router = Router()
router.get("/", ContactController.getContact);
router.post("/", ContactController.create);
router.delete("/:id", ContactController.removeContact);
router.put("/:id", ContactController.updateContact);

export default router
