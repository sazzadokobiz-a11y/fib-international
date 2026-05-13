import { Router } from "express";
import { dashboardController } from "./dashboard.controller";
import auth, { AdminRole } from "../../middleware/auth";

const router = Router();

router.get("/stats", auth(AdminRole.ADMIN), dashboardController.getDashboardStats);

export const dashboardRoute = router;
