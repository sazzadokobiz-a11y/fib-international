import { Router } from "express";
import { quoteController } from "./quote.controller";

const router = Router();

router.post("/create", quoteController.createQuote);
router.get("/get", quoteController.getQuotes);
router.get("/unread-count", quoteController.getUnreadQuoteCount);
router.patch("/mark-all-read", quoteController.markAllQuotesRead);
router.patch("/read/:id", quoteController.markQuoteRead);
router.patch("/status/:id", quoteController.updateQuoteStatus);
router.get("/:id", quoteController.getQuoteDetail);

export const quoteRoute = router;
