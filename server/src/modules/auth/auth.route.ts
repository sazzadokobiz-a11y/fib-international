import { Router } from "express";
import { authController } from "./auth.controller";
import auth, { AdminRole } from "../../middleware/auth";

const router = Router();

router.post("/admin-login", authController.adminLogin);


router.get("/get-admin", auth(AdminRole.ADMIN), authController.getAdmin);

export const authRoute = router;