import { Router } from "express";
import auth, { AdminRole } from "../../middleware/auth";
import { heroController } from "./hero.controller";

const router = Router();

router.post("/create", auth(AdminRole.ADMIN), heroController.createHero);
router.get("/all", auth(AdminRole.ADMIN), heroController.getHeroImage);
router.get("/active", heroController.getActiveHero);
router.put("/update/:id", auth(AdminRole.ADMIN), heroController.updateHero);
router.delete("/delete/:id", auth(AdminRole.ADMIN), heroController.deleteHero);

export const heroRoute = router;
