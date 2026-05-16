import { Router } from "express";
import { contentController } from "./content.controller";
import auth, { AdminRole } from "../../middleware/auth";

const router = Router();

router.post("/create", auth(AdminRole.ADMIN), contentController.createContent);
router.get("/all", contentController.getAllContents);
router.get("/key/:key", contentController.getContentByKey);
router.put("/update/:id", auth(AdminRole.ADMIN), contentController.updateContent);
router.delete("/delete/:id", auth(AdminRole.ADMIN), contentController.deleteContent);

export const contentRoute = router;
