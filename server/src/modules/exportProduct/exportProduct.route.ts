import { Router } from "express";
import { exportProductController } from "./exportProduct.controller";

const router = Router();


router.post("/create", exportProductController.addExportProduct);

router.get("/get-all", exportProductController.getExportProduct);


router.put("/update/:id", exportProductController.updatedExportProduct);

export const exportProductRoute = router;