const typeDefs = `
  type Book {
    bookId: String!
    authors: [String]
    description: String
    title: String!
    image: String
    link: String
  }

  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]!
  }

  type Auth {
    token: ID!
    user: User
  }

  input BookInput {
    bookId: String!
    authors: [String]
    description: String
    title: String!
    image: String
    link: String
  }

  input AddUserInput {
    username: String!
    email: String!
    password: String!
  }

  type Query {
    me: User
    users: [User]
    user(userId: ID!): User
  }

  type Mutation {
    addUser(input: AddUserInput!): Auth
    login(email: String!, password: String!): Auth
    saveBook(input: BookInput!): User
    deleteBook(bookId: String!): User
  }
`;

export default typeDefs;
