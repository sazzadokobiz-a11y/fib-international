import { Router } from "express";
import { importProductController } from "./importProduct.controller";

const router = Router();

router.post("/create", importProductController.addImportProduct);


router.get("/get", importProductController.getImportProduct);


router.put("/update/:id", importProductController.updateImportProduct);

export const importProductRoute = router;