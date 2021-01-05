const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const PostSchema = new Schema({
  title: { type: String, required: true, maxlength: 50 },
  content: { type: String, required: true },
  published: { type: Boolean, required: true },
  timeStamp: { type: Date, default: Date.now },
});

PostSchema.virtual("url").get(() => {
  return "/post/" + this._id;
});

PostSchema.virtual("timeStampFormatted").get(() => {
  return DateTime.fromJSDate(this.timeStamp).toLocaleString(
    DateTime.DATETIME_MED_WITH_WEEKDAY
  );
});

module.exports = mongoose.model("Post", PostSchema);
