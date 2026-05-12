import { Router } from "express";
import { orderController } from "./order.controller";

const router = Router();

router.post("/create", orderController.createOrder);
router.get("/get", orderController.getOrders);
router.patch("/status/:id", orderController.updateOrderStatus);
router.post("/send-courier/:id", orderController.sendCourier);
router.get("/:id", orderController.getOrderDetail);

export const orderRoute = router;
