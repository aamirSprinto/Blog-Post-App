const db = require('./model');

const resolvers = {
  Query: {
    getBlogs: () => db.getBlogs(),
    getBlog: (_, { blogId }) => db.getBlog(blogId),
    validateToken: (_,{token}) => db.validateToken(token),
    getBlogsByCategory: (_,{category})=> db.getBlogsByCategory(category),
  },
  Mutation: {
    createBlog: (_, { blogTitle, blogDetails, category }) => db.createBlog(blogTitle, blogDetails, category),
    updateBlog: (_, { blogId, blogTitle, blogDetails }) => db.updateBlog(blogId, blogTitle, blogDetails),
    deleteBlog: (_, { blogId }) => db.deleteBlog(blogId),
    likeBlog: (_,{blogId})=> db.likeBlog(blogId),
    dislikeBlog: (_,{blogId})=> db.dislikeBlog(blogId),
    createUser:(_,{ userId, passcode, emailId, userName})=> db.createUser(userId, passcode, emailId, userName),
    
    login: async (_, { userId, passcode  }) => db.loginUser(userId , passcode)
          
        
  }
  
  
};

module.exports = resolvers;
