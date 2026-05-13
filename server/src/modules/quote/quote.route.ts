import { Router } from "express";
import { quoteController } from "./quote.controller";
import auth, { AdminRole } from "../../middleware/auth";

const router = Router();

router.post("/create", quoteController.createQuote);
router.get("/get", auth(AdminRole.ADMIN), quoteController.getQuotes);
router.get("/unread-count", auth(AdminRole.ADMIN), quoteController.getUnreadQuoteCount);
router.patch("/mark-all-read", auth(AdminRole.ADMIN), quoteController.markAllQuotesRead);
router.patch("/read/:id", auth(AdminRole.ADMIN), quoteController.markQuoteRead);
router.patch("/status/:id", auth(AdminRole.ADMIN), quoteController.updateQuoteStatus);
router.get("/:id", auth(AdminRole.ADMIN), quoteController.getQuoteDetail);

export const quoteRoute = router;
