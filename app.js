const express = require("express");
const app = express();

//Routes
require("./routes/routes.js")(app);

app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});
