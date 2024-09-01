/* eslint-disable @typescript-eslint/no-explicit-any */

import { Facility } from "../facility/facility.model";
import { TReview } from "./reviews.interface";
import { Review } from "./reviews.model";

const addReview = async (
  slug: string,
  reviewData: Partial<TReview>
): Promise<TReview | any> => {
  const session = await Facility.startSession();

  const facility = await Facility.findOne({ slug });

  if (!facility) {
    throw new Error("Facility not found");
  }

  try {
    session.startTransaction();

    const review = await Review.create(
      [
        {
          facility: facility._id,
          ...reviewData,
        },
      ],
      { session }
    );

    const reviewsCount = await Review.countDocuments({
      facility: facility._id,
    }).session(session);

    // throw new Error("Facility not found");

    await Facility.updateOne(
      { slug },
      { totalRating: reviewsCount },
      { session }
    );

    await session.commitTransaction();

    return review[0];
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    throw error;
  }

  session.endSession();
};

const getAllReviews = async () => {
  const reviews = await Review.find({});

  return reviews;
};

const getReviewBySlug = async (id: string): Promise<TReview | null> => {
  return await Review.findById(id);
};

const updateReview = async (
  id: string,
  reviewData: Partial<TReview>
): Promise<TReview | null> => {
  const review = await Review.findByIdAndUpdate(id, reviewData, { new: true });

  if (!review) {
    throw new Error("Review not found");
  }

  return review;
};
export const ReviewServices = {
  addReview,
  getAllReviews,
  getReviewBySlug,
  updateReview,
  //   deleteReview,
};
