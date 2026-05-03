import { Router } from "express";
import { subCategoryController } from "./subCategory.controller";

const router = Router();


router.post("/create", subCategoryController.createSubCategory);


router.get("/get-all", subCategoryController.getAllSubCategory);


router.put("/update/:id", subCategoryController.updatedSubCategory);


export const subCategoryRoutes = router;