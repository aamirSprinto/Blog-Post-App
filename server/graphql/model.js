var pool = require('../db/config');
const jwt = require('jsonwebtoken');
const config = require('/Users/aamiryaseen/blog-app/server/config.json')
const getBlogs = async () => {
  const result = await pool.query('SELECT * FROM public.blogs ORDER BY "createdOn" desc;');
  return result.rows;
};

const getBlogsByCategory = async (category) => {
  console.log("this is category",category);
  var result =null;
  if(category==null)
   result = await pool.query('SELECT * FROM public.blogs ORDER BY "createdOn" desc');
  else result= result = await pool.query('SELECT * FROM public.blogs where category=$1 ORDER BY "createdOn" desc',[category]);
  console.log(result,"this is resulkt")
  return result.rows;
};

const getBlog = async (blogId) => {
  const result = await pool.query('SELECT * FROM public.blogs WHERE "blogId"= $1', [blogId]);
  return result.rows[0];
};

const validateToken = async (token) => {
  const result = await pool.query('select * from public."userSessions" where "token"=$1', [token]);
  return result.rowCount > 0;
};

const createBlog = async (blogTitle, blogDetails, category) => {
  console.log("this is category", category)
  const result = await pool.query('INSERT INTO public.blogs ("blogTitle", "blogDetails", category, "createdOn") VALUES ($1, $2, $3, NOW()) RETURNING *', [blogTitle, blogDetails,category]);
  //console.log(result);
  return result.rows[0];
};

const updateBlog = async (blogId, blogTitle, blogDetails) => {
  const result = await pool.query('UPDATE public.blogs SET blog_title = $2, blog_details = $3 WHERE blog_id = $1 RETURNING *', [blogId, blogTitle, blogDetails]);
  return result.rows[0];
};

const deleteBlog = async (blogId) => {
  await pool.query('DELETE FROM public.blogs WHERE blog_id = $1', [blogId]);
  return blogId;
};

const likeBlog = async (blogId) => {
    try {
        const updateResult = await pool.query('UPDATE public.blogs SET likes = COALESCE(likes, 0) + 1 WHERE "blogId" = $1 RETURNING likes', [blogId]);
    
        if (updateResult.rows.length === 0) {
          throw new Error('Failed to update likes');
        }
    
        const updatedLikes = updateResult.rows[0].likes;
    
        return updatedLikes;
      } catch (error) {
        console.error('Error liking blog in the model:', error);
        throw new Error('Failed to like blog in the model'); 
      }
};


const dislikeBlog = async (blogId) => {
  try {
    const updateResult = await pool.query('UPDATE public.blogs SET dislikes = COALESCE(dislikes, 0) + 1 WHERE "blogId" = $1 RETURNING dislikes', [blogId]);

    if (updateResult.rows.length === 0) {
      throw new Error('Failed to update dislikes');
    }

    const updatedLikes = updateResult.rows[0].dislikes;

    return updatedLikes;
  } catch (error) {
    console.error('Error disliking blog in the model:', error);
    throw new Error('Failed to dislike blog in the model'); 
  }
};

const createUser = async (userId, passcode, emailId ,userName) => {
  const result=await pool.query('INSERT INTO public.users ("userId", "passcode" ,"emailId", "userName") VALUES ($1, $2, $3, $4) RETURNING *', [userId, passcode, emailId, userName]);
  return result.rows[0];
};

const loginUser = async (userId, passcode) => {
  const result = await pool.query('SELECT 1 FROM public.users Where "userId" = $1 and "passcode" = $2', [userId, passcode]);
  console.log('this is my result' , result)
    
  if (result.rowCount == 1) {
   
  
      const token = jwt.sign({ userId: userId, passcode: passcode  }, config.secretKey, {
        expiresIn: '3h', 
      });
      await pool.query('INSERT INTO public."userSessions" ("userId", "token") VALUES($1, $2)', [userId, token]);
      return  {token} ;
    
   
  }
  else{
    
    return null

  }
}

module.exports = {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
  dislikeBlog,
  createUser,
  loginUser,
  validateToken,
  getBlogsByCategory,
};
