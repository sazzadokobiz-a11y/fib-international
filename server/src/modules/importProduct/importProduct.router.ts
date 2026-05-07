import { Router } from "express";
import { importProductController } from "./importProduct.controller";

const router = Router();

router.post("/create", importProductController.addImportProduct);


router.get("/get", importProductController.getImportProduct);

export const importProductRoute = router;