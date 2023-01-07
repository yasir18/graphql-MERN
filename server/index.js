const express = require("express");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const schema = require("./schema/schema");

const port = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.get("/test", function (req, res) {
  res.status(200);
  res.send("Hello world");
});

app.listen(port, console.log(`Server is listening at ${port}`));
