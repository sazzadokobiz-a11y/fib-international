import express from "express";
import upload from "../../middleware/multer";
import { imageUploadController } from "./imageUpload.controller";


const router = express.Router();

router.post("/", upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 10 },
]), imageUploadController);

export const imageUploadRoute = router;