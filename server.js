const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const app = express();
const PORT = 8080;

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));

//Routes
require("./routes/routes.js")(app);

//Mongo Stuff
mongoose.Promise = Promise;
if (process.env.MONGODB_URI){
  console.log("Using MongoDB URI: " + process.env.MONGODB_URI);
  mongoose.connect(process.env.MONGODB_URI, {
    useMongoClient: true
  });
}
else{
  console.log("Using localhost")
  mongoose.connect("mongodb://localhost/articles", {
    useMongoClient: true
  });
}

app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});
