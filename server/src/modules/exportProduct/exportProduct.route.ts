import { Router } from "express";
import { exportProductController } from "./exportProduct.controller";
import auth, { AdminRole } from "../../middleware/auth";

const router = Router();


router.post("/create", auth(AdminRole.ADMIN), exportProductController.addExportProduct);

router.get("/get-all", exportProductController.getExportProduct);

router.get("/slug/:slug", exportProductController.getProductDetailBySlug);

router.get("/get/:id", exportProductController.getProductDetail);


router.put("/update/:id", auth(AdminRole.ADMIN), exportProductController.updatedExportProduct);


router.delete("/delete/:id", auth(AdminRole.ADMIN), exportProductController.deleteExportProduct);

export const exportProductRoute = router;
