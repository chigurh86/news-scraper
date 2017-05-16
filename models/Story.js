var mongoose = require("mongoose");

var Schema = mongoose.Schema;

// Create article schema
var StorySchema = new Schema({
  // title is a required string
  title: {
    type: String,
    required: true
  },
  // link is a required string
  link: {
    type: String,
    required: true
  },
  // This only saves one note's ObjectId, ref refers to the Note model
  note: {
    type: Schema.Types.ObjectId,
    ref: "userComment"
  }
});

// Create the Article model with the ArticleSchema
var Story = mongoose.model("Story", StorySchema);

// Export the model
module.exports = Story;
