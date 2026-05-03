import express, { Router } from 'express';
import { categoryRoutes } from '../modules/category/category.route';

const router = Router();

const moduleRoutes = [
    {
        path: "/category",
        route: categoryRoutes
    }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;