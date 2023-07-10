const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const express = require("express");
const cors = require("cors");
const http = require("http");
const { v1: uuid } = require("uuid");

const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");

// env
const config = require("./utils/config");
const MONGO_URL = config.MONGODB_URI;

// database 
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Book = require('./models/Book')
const Author = require('./models/Author')

// user administration
const User = require('./models/User')
const jwt = require('jsonwebtoken');
const { GraphQLError } = require("graphql");


mongoose
  .connect(MONGO_URL)
  .then(() => { console.log("connected to MongoDB"); })
  .catch((error) => { console.log("error connecting MongoDB:", error.message)});

const typeDefs = require("./schema");
const resolvers = require("./resolvers");

// moving setup to function
const start = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  const wsServer = new WebSocketServer({ server: httpServer, path: "/", });

  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();

  app.use( "/", cors(), express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null;
        if (auth && auth.startsWith("Bearer ")) {
          const decodedToken = jwt.verify( auth.substring(7), process.env.TOKEN_SECRET )
          const currentUser = await User.findById(decodedToken.id)
          return { currentUser };
        }
      },
    })
  );

  const PORT = 4000;
  httpServer.listen(PORT, () => console.log(`Server is now running on http://localhost:${PORT}`) );
};

start();