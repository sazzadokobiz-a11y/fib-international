import { Router } from "express";
import { bannerController } from "./banner.controller";
import auth, { AdminRole } from "../../middleware/auth";

const router = Router();

router.post("/create", auth(AdminRole.ADMIN), bannerController.createBanner);
router.get("/all", bannerController.getAllBanners);
router.get("/active", bannerController.getActiveBanners);
router.put("/update/:id", auth(AdminRole.ADMIN), bannerController.updateBanner);
router.delete("/delete/:id", auth(AdminRole.ADMIN), bannerController.deleteBanner);

export const bannerRoute = router;
