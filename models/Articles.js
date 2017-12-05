const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
const ArticleSchema = new Schema({
  title: {
    type: String
  },
  url: {
    type: String,
    unique: true
  },
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now }
});

// This creates our model from the above schema, using mongoose's model method
const Articles = mongoose.model("Articles", ArticleSchema);

// Export the User model
module.exports = Articles;
