import express from "express";
import { categoryController } from "./category.controller";

const router = express.Router();


router.post("/add", categoryController.addCategory);

router.get("/all", categoryController.getAllCategory);

router.put("/edit/:id", categoryController.editCategory);

router.delete("/delete/:id", categoryController.deleteCategory);


export const categoryRoutes = router