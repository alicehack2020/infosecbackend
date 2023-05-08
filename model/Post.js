import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    },
    userid: {
        type: String,
        required: true,
   },
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);

export default Post;
