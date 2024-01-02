import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("http://localhost:3001/blogs/allblog");
      if (data?.success) {
        setBlogs(data?.blog);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  const formatDateTime = (timestamp) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(timestamp).toLocaleDateString(undefined, options);
    const time = new Date(timestamp).toLocaleTimeString();
    return { date, time };
  };

  const limitDescription = (description, limit) => {
    if (description.length <= limit) {
      return description;
    }
    return description.substring(0, limit) + "...";
  };

  return (
    
    <div className="relative bg-gray-50 px-6 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28">
      <div className="absolute inset-0">
        <div className="h-1/3 bg-white sm:h-2/3"></div>
      </div>
      <div className="relative mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Blogs</h2>
          <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
            The only limit to our realization of tomorrow will be our doubts of today.
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
          {blogs &&
            blogs.map((blog) => (
              
              <div key={blog._id}  isUser={localStorage.getItem("userId") === blog?.user?._id} className="flex flex-col overflow-hidden rounded-lg shadow-lg"> 
             
                <div className="flex-shrink-0">
                  <img className="h-48 w-full object-cover" src={blog.image} alt="" />
                </div>
                <div className="flex flex-1 flex-col justify-between bg-white p-6">
                  <div className="flex-1">
                  
                    
                    <Link to={`/viewblog/${blog._id}`} className="mt-2 block">
                      <p className="text-xl font-semibold text-gray-900">Title: {blog.title}</p>
                      <p>{limitDescription(blog.description, 100)}</p>
                      <p className="mt-3 text-base text-gray-500"></p>
                    </Link>
                  </div>
                  <div className="mt-6 flex items-center">
                    <div className="flex space-x-1 text-sm text-gray-500 ">
                      <time dateTime={blog.createdAt} className="font-bold">
                        Date: {formatDateTime(blog.createdAt).date}
                      </time>
                      <span aria-hidden="true">·</span>
                      Time: {formatDateTime(blog.createdAt).time}
                    </div>
                  </div>
                  <Link to={`/viewblog/${blog._id}`}>
                    <button className="btn btn-primary mt-2">View Blog</button>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
