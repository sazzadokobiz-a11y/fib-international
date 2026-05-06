import express, { Router } from 'express';
import { categoryRoutes } from '../modules/category/category.route';
import { subCategoryRoutes } from '../modules/subCategory/subCategory.route';
import { exportProductRoute } from '../modules/exportProduct/exportProduct.route';
import { imageUploadRoute } from '../modules/imageUpload/imageUpload.route';

const router = Router();

const moduleRoutes = [
    {
        path: "/category",
        route: categoryRoutes
    },
    {
        path: "/sub-category",
        route: subCategoryRoutes
    },
    {
        path: "/export-product",
        route: exportProductRoute
    },
    {
        path: "/image-upload",
        route: imageUploadRoute
    }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;