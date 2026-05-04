import { Router } from "express";
import { exportProductController } from "./exportProduct.controller";

const router = Router();


router.post("/create", exportProductController.addExportProduct);

router.get("/get-all", exportProductController.getExportProduct);

export const exportProductRoute = router;