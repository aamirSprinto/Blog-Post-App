import BlogPost from './BlogPost'; 
import { useQuery, gql } from '@apollo/client';

const GET_BLOGS = gql`
query GetBlogs {
    getBlogs {
     blogId
      blogDetails
      blogTitle
    }
  }
`;
const  HomePage = ()=>{
const { loading, error, data } = useQuery(GET_BLOGS);
    
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
      return (
        <div className="app">
          {data.getBlogs.map((blog) => (
            <BlogPost key={blog.blogId} title={blog.blogTitle} content={blog.blogDetails} />
          ))}
        </div>
      );
}
export default HomePage