import axios from "axios";
import React, { useState, useEffect } from "react";
import BlogCard from "../components/BlogCard";

const UserBlog = () => {
  const [blogs, setblogs] = useState([]);

  //get 1 user blog
  const getUserBlog = async () => {
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(
        `http://localhost:3001/blogs//userblog/${id}`
      );
      if (data?.success) {
        setblogs(data?.userBlog.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //useeffecthook
  useEffect(() => {
    getUserBlog();
  }, []);
  return (
    <div>
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <BlogCard
            id={blog._id}
            isUser= {true}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            username={blog.username}
            time={blog.createdAt}
          />
        ))
      ) : (
        <h1>No blogs Found</h1>
      )}
    </div>
  );
};

export default UserBlog;
