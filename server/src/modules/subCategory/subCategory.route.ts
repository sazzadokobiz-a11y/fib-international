import { Router } from "express";
import { subCategoryController } from "./subCategory.controller";

const router = Router();


router.post("/create", subCategoryController.createSubCategory);


router.get("/get-all", subCategoryController.getAllSubCategory);


export const subCategoryRoutes = router;