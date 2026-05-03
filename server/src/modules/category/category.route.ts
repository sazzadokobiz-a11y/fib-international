import express from "express";
import { categoryController } from "./category.controller";

const router = express.Router();


router.post("/add", categoryController.addCategory)


export const categoryRoutes = router