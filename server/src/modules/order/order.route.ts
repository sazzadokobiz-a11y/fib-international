import { Router } from "express";
import { orderController } from "./order.controller";
import auth, { AdminRole } from "../../middleware/auth";

const router = Router();

router.post("/create", orderController.createOrder);
router.get("/get", auth(AdminRole.ADMIN), orderController.getOrders);
router.patch("/status/:id", auth(AdminRole.ADMIN), orderController.updateOrderStatus);
router.post("/send-courier/:id", auth(AdminRole.ADMIN), orderController.sendCourier);
router.get("/:id", auth(AdminRole.ADMIN), orderController.getOrderDetail);

export const orderRoute = router;
