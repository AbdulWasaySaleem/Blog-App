import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    blogs: [{ type: mongoose.Types.ObjectId, ref: "blogs" }],
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("users", UserSchema);
