import { Router } from "express";
import { subCategoryController } from "./subCategory.controller";
import auth, { AdminRole } from "../../middleware/auth";

const router = Router();


router.post("/create", auth(AdminRole.ADMIN), subCategoryController.createSubCategory);


router.get("/get-all", subCategoryController.getAllSubCategory);


router.put("/update/:id", auth(AdminRole.ADMIN), subCategoryController.updatedSubCategory);



router.delete("/delete/:id", auth(AdminRole.ADMIN), subCategoryController.deleteSubCategory);


export const subCategoryRoutes = router;