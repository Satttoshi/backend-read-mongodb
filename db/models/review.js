import mongoose from "mongoose";

const { Schema } = mongoose;

// This is the same as the Product model, but with a different name, and  a different schema.
const ReviewSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  rating: { type: Number, required: true },
});

const Review = mongoose.models.Review || mongoose.model("Review", ReviewSchema);

export default Review;
