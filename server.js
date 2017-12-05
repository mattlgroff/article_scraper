const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 8080;

//Routes
require("./routes/routes.js")(app);

//Mongo Stuff
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/articles", {
  useMongoClient: true
});

app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});
