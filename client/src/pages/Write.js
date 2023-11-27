import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useMutation, gql } from '@apollo/client';
import useAuth from '/Users/aamiryaseen/blog-app/client/src/components/autth.js';
import { Link,useNavigate } from 'react-router-dom';
import { stripHtmlTags } from './utils';

const CREATE_BLOG = gql`
  mutation createBlog($blogTitle: String!, $blogDetails: String!, $category: String!) {
    createBlog(blogTitle: $blogTitle, blogDetails: $blogDetails, category: $category) {
      blogId
      blogTitle
      blogDetails
      category
    }
  }
`;



const Write = () => {
  const navigate = useNavigate();
  useAuth();

  const [blogTitle, setTitle] = useState("");
  const [blogDetails, setContent] = useState("");
  const [category, setCategory] = useState("");

  const [createBlog, { loading, error }] = useMutation(CREATE_BLOG, {
    onCompleted: (result) => {
      console.log("Blog created:", result.createBlog);
      
      navigate("/"); 
      window.location.reload(true); 
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });

  const handlePublish = () => {
    const strippedContent = stripHtmlTags(blogDetails);
    createBlog({
      variables: {
        blogTitle,
        blogDetails: strippedContent,
        category,
      },
    });
  };
  
  return (
    
    <div className="add">
      <div className="content">
        <input
          type="text"
          placeholder="Title"
          value={blogTitle}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={blogDetails}
            onChange={(value) => setContent(value)}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>

          <div className="buttons">
            <button onClick={handlePublish} disabled={loading}>
              Save as a draft
            </button>
            <button onClick={handlePublish} disabled={loading}>
              Publish
            </button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input
              type="radio"
              name="category"
              value="art"
              id="art"
              checked={category === "art"}
              onChange={() => setCategory("art")}
            />
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="category"
              value="science"
              id="science"
              checked={category === "science"}
              onChange={() => setCategory("science")}
            />
            <label htmlFor="science">Science</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="category"
              value="technology"
              id="technology"
              checked={category === "technology"}
              onChange={() => setCategory("technology")}
            />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="category"
              value="cinema"
              id="cinema"
              checked={category === "cinema"}
              onChange={() => setCategory("cinema")}
            />
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="category"
              value="design"
              id="design"
              checked={category === "design"}
              onChange={() => setCategory("design")}
            />
            <label htmlFor="design">Design</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="category"
              value="food"
              id="food"
              checked={category === "food"}
              onChange={() => setCategory("food")}
            />
            <label htmlFor="food">Food</label>
          </div>
        </div>
      </div>
    </div>
  );
};



export default Write;
