import { Router } from "express";
import { importProductController } from "./importProduct.controller";

const router = Router();

router.post("/create", importProductController.addImportProduct);

export const importProductRoute = router;