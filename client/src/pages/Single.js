import React, { useEffect, useState } from "react";
//import Edit from "../img/edit.png";
//import Delete from "../img/delete.png";
import { Link, useLocation, useNavigate,useParams } from "react-router-dom";
import Menu from "../components/Menu";
import { useQuery, gql } from '@apollo/client';
//import { useContext } from "react";
//import { AuthContext } from "../context/authContext";
//mport DOMPurify from "dompurify";
const GET_BLOG = gql`
  query GetBlog($blogId: ID!) {
    getBlog(blogId: $blogId) {
      blogId
      blogDetails
      blogTitle
    }
  }
`;

const Single = ({ blogId }) => {
 const { id } = useParams();
 const parsedId = parseInt(id, 10);
 console.log(id);
  const { loading, error, data } = useQuery(GET_BLOG, {
    variables: { blogId : parsedId},
  });
  console.log("this is data",data)  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;


  return (
    <div className="home">
          <div className="posts">
          <>
           <div className="post" key={data.getBlog.blogId}></div>
           <div className="content">
            <h1>{data.getBlog.blogTitle}</h1>
            
            <p>{data.getBlog.blogDetails}</p>
           </div>
           
          </>
           
  
  </div>
  </div>
  );
};

export default Single;
