const Router = require("express");
const ContactController = require("./ContactController");
const router = new Router();

router.get("/", ContactController.getContact);
router.post("/", ContactController.create);
router.delete("/:id", ContactController.removeContact);
router.put("/:id", ContactController.updateContact);
module.exports = router;
