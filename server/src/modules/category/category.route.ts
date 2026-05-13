import express from "express";
import { categoryController } from "./category.controller";
import auth, { AdminRole } from "../../middleware/auth";

const router = express.Router();


router.post("/add", auth(AdminRole.ADMIN), categoryController.addCategory);

router.get("/all", categoryController.getAllCategory);

router.put("/edit/:id", auth(AdminRole.ADMIN), categoryController.editCategory);

router.delete("/delete/:id", auth(AdminRole.ADMIN), categoryController.deleteCategory);


export const categoryRoutes = router