const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const PostSchema = new Schema(
  {
    title: { type: String, required: true, maxlength: 50 },
    content: { type: String, required: true },
    published: { type: Boolean, required: true },
    timeStamp: { type: Date, default: Date.now },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    comment: { type: Schema.Types.ObjectId, ref: "Comment" },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

PostSchema.virtual("url").get(() => {
  return "/post/";
});

PostSchema.virtual("timeStampFormatted").get(() => {
  return DateTime.fromJSDate(this.timeStamp);
});

module.exports = mongoose.model("Post", PostSchema);
