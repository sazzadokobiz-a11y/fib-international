import { Router } from "express";
import { exportProductController } from "./exportProduct.controller";

const router = Router();


router.post("/create", exportProductController.addExportProduct);

router.get("/get-all", exportProductController.getExportProduct);


router.put("/update/:id", exportProductController.updatedExportProduct);


router.delete("/delete/:id", exportProductController.deleteExportProduct);

export const exportProductRoute = router;