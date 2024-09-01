import express from "express";
import { ReviewControllers } from "./reviews.controller";

const router = express.Router();

router.post("/:slug/review", ReviewControllers.addReview);
router.get("/", ReviewControllers.getAllReviews);
router.get("/:id/single-review", ReviewControllers.getReviewById);
router.patch("/:slug/review", ReviewControllers.updateReview);

export const ReviewRoutes = router;
