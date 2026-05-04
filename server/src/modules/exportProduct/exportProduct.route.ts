import { Router } from "express";
import { exportProductController } from "./exportProduct.controller";

const router = Router();


router.post("/create", exportProductController.addExportProduct);


export const exportProductRoute = router;