const express = require("express");
const app = express();
const PORT = 8080;

//Routes
require("./routes/routes.js")(app);

app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});
