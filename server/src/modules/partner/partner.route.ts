import { Router } from "express";
import { partnerController } from "./partner.controller";
import auth, { AdminRole } from "../../middleware/auth";

const router = Router();

router.post("/create", auth(AdminRole.ADMIN), partnerController.createPartner);
router.get("/all", partnerController.getAllPartners);
router.get("/active", partnerController.getActivePartners);
router.put("/update/:id", auth(AdminRole.ADMIN), partnerController.updatePartner);
router.delete("/delete/:id", auth(AdminRole.ADMIN), partnerController.deletePartner);

export const partnerRoute = router;
