const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const Book = require('./models/Book')
const Author = require('./models/Author')
const User = require('./models/User')

// subscription 
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

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

const resolvers = {
  Query: {
    me: async (root, args, context) => context.currentUser,
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => Book.find({}).populate("author"),
    allAuthors: async () => Author.find({}),
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
      if (!authObj) {
        authObj = await new Author({ name: args.author });
      }

      // args.author was passed in as a string, but Book.author requires Author object
      const book = new Book({ ...args, author: authObj });
      await book.save()

      // update subscribers
      pubsub.publish('BOOK_ADDED', {bookAdded: book})

      return book
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
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers