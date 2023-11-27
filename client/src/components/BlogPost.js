import React from 'react';
import '/Users/aamiryaseen/blog-app/client/src/styling/blogPost.css'; 

const BlogPost = ({ title, content }) => {
  return (
    <div className="blog-post-container">
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
};

export default BlogPost;