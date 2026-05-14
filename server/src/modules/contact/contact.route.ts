import { Router } from "express";
import { contactController } from "./contact.controller";
import auth, { AdminRole } from "../../middleware/auth";

const router = Router();

router.post("/create", contactController.createContact);

router.get("/get", auth(AdminRole.ADMIN), contactController.getAllContacts);

router.get("/unread-count", auth(AdminRole.ADMIN), contactController.getUnreadContactCount);

router.patch("/read/:id", auth(AdminRole.ADMIN), contactController.markAsRead);

router.delete("/delete/:id", auth(AdminRole.ADMIN), contactController.deleteContact);

export const contactRoute = router;