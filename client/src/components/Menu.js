import React from "react";
import { useQuery, gql } from '@apollo/client';
import { Link } from "react-router-dom";
const GET_BLOGS = gql`
query GetBlogs {
    getBlogs {
      blogId
      blogDetails
      blogTitle
    }
  }
`;

const  Menu = ()=>{
const { loading, error, data } = useQuery(GET_BLOGS);
  console.log("this is data",data)  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
return (
  <div className="menu">
      <h1>Other posts you may like</h1>
      {data.getBlogs.map((blog) => (
        <>
          <div className="post" key={blog.blogId}></div>
           <div className="content">
            <Link className="link" to={`/post/${blog.blogId}`}>
            <h1>{blog.blogTitle}</h1>
            </Link>
            <p>{blog.blogDetails}</p>
            <button>read more</button>
        </div>
        </>
      ))}
    </div>
      );
}
export default Menu;