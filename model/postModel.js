const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    // published: { type: Boolean, required: true },
    timeStamp: { type: Date, default: Date.now },
    username: { type: String, required: true },
    // comment: { type: Schema.Types.ObjectId, ref: "Comment" },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

PostSchema.virtual("url").get(() => {
  return "/post/" + this._id;
});

PostSchema.virtual("timeStampFormatted").get(() => {
  return DateTime.fromJSDate(this.timeStamp);
});

module.exports = mongoose.model("Post", PostSchema);
