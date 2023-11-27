import React from "react";
import { useQuery, gql } from '@apollo/client';
import { Link, useLocation, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

const GET_BLOGS = gql`
query getBlogsByCategory($category : String) {
  getBlogsByCategory(category : $category)  {
      blogId
      blogDetails
      blogTitle
      likes
      dislikes
    }
  }
`;
const  HomePage = ()=>{

const category = new URLSearchParams(useLocation().search).get("cat");
console.log("this is category",category)
const { loading, error, data } = useQuery(GET_BLOGS, {
  variables: { category: category },
});
  console.log("this is data",data)  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
      return (
        <div className="home">
          <div className="posts">
            
          {data.getBlogsByCategory.map((blog) => (
          <>
           <div className="post" key={blog.blogId}></div>
           <div className="content">
            <Link className="link" to={`/post/${blog.blogId}`}>
            <h1>{blog.blogTitle}</h1>
            </Link>
            <p>{blog.blogDetails}</p>
            <div className="likes-dislikes">
                <span>
                  {blog.likes !== null ? (
                    <>
                      <FontAwesomeIcon icon={faThumbsUp} size="lg" /> {blog.likes}
                    </>
                  ) : <><FontAwesomeIcon icon={faThumbsUp} size="lg" />0</>}
                </span>
                <span>
                  {blog.dislikes !== null ? (
                    <>
                      <FontAwesomeIcon icon={faThumbsDown} size="lg" /> {blog.dislikes}
                    </>
                  ) : <><FontAwesomeIcon icon={faThumbsDown} size="lg" />0</>}
                </span>
              </div>
           </div>
           
          </>
           
          ))}
          </div>
        </div>
      );
}
export default HomePage