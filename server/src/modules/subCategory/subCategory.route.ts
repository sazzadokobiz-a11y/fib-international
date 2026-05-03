import { Router } from "express";
import { subCategoryController } from "./subCategory.controller";

const router = Router();


router.post("/create", subCategoryController.createSubCategory);


export const subCategoryRoutes = router;