import { Router } from "express";
import { importProductController } from "./importProduct.controller";
import auth, { AdminRole } from "../../middleware/auth";

const router = Router();

router.post("/create", auth(AdminRole.ADMIN), importProductController.addImportProduct);


router.get("/get", importProductController.getImportProduct);

router.get("/slug/:slug", importProductController.getImportProductDetailBySlug);

router.get("/get/:id", importProductController.getImportProductDetail);


router.put("/update/:id", auth(AdminRole.ADMIN), importProductController.updateImportProduct);


router.delete("/delete/:id", auth(AdminRole.ADMIN), importProductController.deleteImportProduct);

export const importProductRoute = router;
