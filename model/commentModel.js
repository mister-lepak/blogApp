const { DateTime } = require("luxon");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  content: { type: String, required: true },
  published: { type: Boolean, required: true },
  timeStamp: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

CommentSchema.virtual("url").get(() => {
  return "/comment/" + this._id;
});

CommentSchema.virtual("timeStampFormatted").get(() => {
  return DateTime.fromJSDate(this.timeStamp).toLocaleString(
    DateTime.DATE_MED_WITH_WEEKDAY
  );
});

module.exports = mongoose.model("Comment", CommentSchema);
