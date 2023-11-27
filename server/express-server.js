
// const express = require('express');
// const { graphqlHTTP } = require('express-graphql');
// const { sequelize } = require('./db');
// const schema = require('./graphql/schema');
// const rootValue = require('./graphql/resolver');
// const cors = require('cors'); 
// const app = express();
// app.use(cors());
// // Connect to the database
// sequelize
//   .sync()
//   .then(() => {
//     console.log('Connected to the database');
//   })
//   .catch((error) => {
//     console.error('Error connecting to the database:', error);
//   });

// app.use('/graphql', graphqlHTTP({ schema, rootValue, graphiql: true ,introspection: true}));

// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


const express = require('express');
const { ApolloServer} = require('apollo-server-express');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolver');
const cors = require('cors');


async function startApolloServer() {
  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start(); // Make sure to await the server start

  const app = express();
  app.use(cors());
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 3001;
  // console.log(printSchema(server.schema)); // Use printSchema directly
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/graphql`);
  });
}

startApolloServer();
