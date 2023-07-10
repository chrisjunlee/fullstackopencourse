const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v1: uuid } = require("uuid");

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

let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
];

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "The Demon ",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
];

const typeDefs = `
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    name: String!,
    born: Int,
    bookCount: Int!
  }

  type Book {
    title: String!,
    author: Author,
    published: Int!,
    genres: [String!]!,
    id: ID!
  }

  type Query {
    me: String,
    bookCount: Int!,
    authorCount: Int!,
    allBooks(name: String, genre: String): [Book!]!,
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!, 
      author: String!,
      published: Int!,
      genres: [String]!
    ): Book!,
    editAuthor(
      name: String!,
      setBornTo: Int!
    ): Author,
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`;

const resolvers = {
  Query: {
    me: async (root, args, context) => context.currentUser,
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => Book.find({}).populate('author'),
    allAuthors: async () => Author.find({})
  },
  Author: {
    bookCount: (root) => {
      return books.filter(
        (book) => book.author.toLowerCase() === root.name.toLowerCase()
      ).length;
    },
  },

  Mutation: {
    addBook: async (root, args, context) => {
      if (!context) return null;

      let authObj = await Author.findOne({ name: args.author });

      // create new author 
      if(!authObj) {
        authObj = await new Author({name: args.author})
      }

      // args.author was passed in as a string, but Book.author requires Author object
      const book = new Book({ ...args, author: authObj });
      return book.save();
    },
    editAuthor: async (root, { name, setBornTo }, context) => {
      if (!context) return null;

      let result = await Author.findOne({ name: name });

      // create new
      if (!result) {
        const newAuthor = new Author({ name: name, born: setBornTo });
        return newAuthor.save();
      }

      result = Author.findOneAndUpdate({ name: name }, { born: setBornTo });
      return result;
    },
    createUser: async (root, { username, favoriteGenre }) => {
      const newUser = new User({
        username: username,
        favoriteGenre: favoriteGenre,
      });

      return newUser.save().catch((error) => {
        throw new GraphQLError("Creating user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: username,
            error,
          },
        });
      });
    },
    login: async (root, { username, password }) => {
      const user = await User.findOne({ username: username });

      const HARDCODED_PASSWORD = "1";
      if (!user || password !== HARDCODED_PASSWORD) {
        throw new GraphQLError("Invalid Credentials", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      const preToken = { username: user.username, id: user._id };
      const token = { value: jwt.sign(preToken, process.env.TOKEN_SECRET) };
      return token;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.TOKEN_SECRET );
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser };
    }
  }
}).then(({ url }) => { console.log(`Server ready at ${url}`); });