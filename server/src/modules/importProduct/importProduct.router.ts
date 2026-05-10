import { Router } from "express";
import { importProductController } from "./importProduct.controller";

const router = Router();

router.post("/create", importProductController.addImportProduct);


router.get("/get", importProductController.getImportProduct);


router.get("/get/:id", importProductController.getImportProductDetail);


router.put("/update/:id", importProductController.updateImportProduct);


router.delete("/delete/:id", importProductController.deleteImportProduct);

export const importProductRoute = router;