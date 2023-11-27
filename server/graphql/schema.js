const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Blog {
    blogId: ID!
    blogTitle: String!
    blogDetails: String!
    createdOn: Date!
    updatedOn: Date!
    likes: Int
    dislikes: Int
    category: String!
  }

  type User {
    id: ID!
    userId: String!
    passcode: String!
    emailId: String!
    userName: String!
  }
  type UserSession{
    userId: String
    token: String
  }

  type Query {
    getBlogs: [Blog]
    getBlog(blogId: ID!): Blog
    validateToken(token: String!): Boolean 
    getBlogsByCategory(category: String): [Blog]
  }

  type Mutation {
    createBlog(blogTitle: String!, blogDetails: String!,category:String!): Blog!
    updateBlog(blogId: ID!, blogTitle: String!, blogDetails: String!): Blog!
    deleteBlog(blogId: ID!): ID!
    likeBlog(blogId: ID!):Int!
    dislikeBlog(blogId: ID!):Int!
    createUser(userId: String!, passcode: String!, emailId: String!, userName: String!): User
    login(userId: String!, passcode: String!): AuthPayload

  }
 

  type AuthPayload {
    token: String
  }
  
  scalar Date, 
`;

module.exports = typeDefs;
