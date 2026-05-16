import { Router } from "express";
import { contactController } from "./contact.controller";
import auth, { AdminRole } from "../../middleware/auth";

const router = Router();

router.post("/create", contactController.createContact);

router.get("/get", auth(AdminRole.ADMIN), contactController.getAllContacts);

router.get("/get-stats", auth(AdminRole.ADMIN), contactController.getContactStats);

router.put("/status/:id", auth(AdminRole.ADMIN), contactController.updateContactStatus);

router.get("/unread-count", auth(AdminRole.ADMIN), contactController.getUnreadContactCount);

router.patch("/read/:id", auth(AdminRole.ADMIN), contactController.markAsRead);

router.delete("/delete/:id", auth(AdminRole.ADMIN), contactController.deleteContact);

export const contactRoute = router;