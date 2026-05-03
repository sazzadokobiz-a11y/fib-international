import express from "express";
import { categoryController } from "./category.controller";

const router = express.Router();


router.post("/add", categoryController.addCategory)

router.put("/edit/:id", categoryController.editCategory)


export const categoryRoutes = router