import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, require: [true, "title is required"] },
    description: { type: String, require: [true, "title is required"] },
    image: { type: String, require: [true, "image is required"] },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      require: [true, "User ID is required"],
    },
  },
  { timestamps: true }
);

export const BlogModel = mongoose.model("blogs", BlogSchema);
