import express, { Router } from 'express';
import { categoryRoutes } from '../modules/category/category.route';
import { subCategoryRoutes } from '../modules/subCategory/subCategory.route';
import { exportProductRoute } from '../modules/exportProduct/exportProduct.route';
import { imageUploadRoute } from '../modules/imageUpload/imageUpload.route';
import { importProductRoute } from '../modules/importProduct/importProduct.router';
import { quoteRoute } from '../modules/quote/quote.route';
import { orderRoute } from '../modules/order/order.route';
import { dashboardRoute } from '../modules/dashboard/dashboard.route';
import { authRoute } from '../modules/auth/auth.route';
import { contactRoute } from '../modules/contact/contact.route';

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
        path: "/import-product",
        route: importProductRoute
    },
    {
        path: "/image-upload",
        route: imageUploadRoute
    },
    {
        path: "/quote",
        route: quoteRoute
    },
    {
        path: "/order",
        route: orderRoute
    },
    {
        path: "/dashboard",
        route: dashboardRoute
    },
    {
        path: "/auth",
        route: authRoute
    },
    {
        path: "/contact",
        route: contactRoute
    }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
