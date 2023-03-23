const mongoose = require("mongoose");

const BlogSettingSchema = mongoose.Schema(
  {
    blog_title: {
      type: String,
      required: true,
    },
    blog_logo: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("BlogSetting", BlogSettingSchema);
