const express = require("express");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");

const port = process.env.PORT || 6000;
const app = express();

// app.use('/graphql',graphqlHTTP({
//     schema,
//     graphiql: true
// }))

app.listen(port, console.log(`Server is listening at ${port}`));
