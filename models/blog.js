const { Schema, model } = require("mongoose");

const blogSchema = new Schema({
  title: {
    type: String,
    reuired: true,
  },
  body: {
    type: String,
    required: true,
  },
  coverImageUrl: {
    type: String,
    required: false,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
},{timestamps: true});


const blog = ("Blog",blogSchema);

module.exports = blog;
