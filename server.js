const express = require('express');
const exphbs = require("express-handlebars");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 8080;


// Handlebars
app.engine("handlebars", exphbs(
  { defaultLayout: "main" }
));
app.set("view engine", "handlebars");

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes
require("./routes/routes.js")(app);

//Mongo Stuff
mongoose.Promise = Promise;
if (process.env.MONGODB_URI){
  console.log("Using MongoDB URI: " + process.env.MONGODB_URI);
  mongoose.connect(process.env.MONGODB_URI, {
    useMongoClient: true
  })
  .then(data => {
    console.log("Connected to MongoDB.");
  })
  .catch(err => {
    console.error(err);
    process.exit();
  });
}
else{
  console.log("Using localhost")
  mongoose.connect("mongodb://localhost/articles", {
    useMongoClient: true
  })
  .then(data => {
    console.log("Connected to MongoDB.");
  })
  .catch(err => {
    console.error(err);
    process.exit();
  });
}

app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});
