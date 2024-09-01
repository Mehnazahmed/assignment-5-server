import { Schema, model } from "mongoose";
import { TReview } from "./reviews.interface";

const reviewSchema = new Schema<TReview>({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});

export const Review = model<TReview>("Review", reviewSchema);
