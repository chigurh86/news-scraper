var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  // Just a string
  title: {
    type: String
  },
  // Just a string
  body: {
    type: String
  }
});

// Create the Article model with the ArticleSchema
var userComment = mongoose.model("userComment", CommentSchema);

// Export the model
module.exports = userComment;
