import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const SingleBlog = () => {
  const [blog, setBlog] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchBlog = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/blogs/getblog/${id}`
      );
      if (response.data.success) {
        setBlog(response.data.blog);
      } else {
        console.error("Error fetching blog:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };

  const formatDateTime = (timestamp) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(timestamp).toLocaleDateString(undefined, options);
    const time = new Date(timestamp).toLocaleTimeString();
    return { date, time };
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  return (
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-3 mt-6 ">
      <div class="max-w-3xl mx-auto m-6 p-6 border-2">
        {blog ? (
          <div class="py-8 ">
            <h1 class="text-3xl font-bold mb-2">{blog.title}</h1>

            <p class="text-gray-500 text-sm">
              Published on{" "}
              <time dateTime={blog.createdAt}>
                Date: {formatDateTime(blog.createdAt).date} | Time:{" "}
                {formatDateTime(blog.createdAt).time}
              </time>
            </p>
          </div>
        ) : (
          <p>Loading...</p>
        )}

        {blog && (
          <>
            {blog.image && (
              <img
                src={blog.image}
                alt={blog.title}
                class="w-full h-auto mb-8"
              />
            )}

            <div class="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto">
              <p>{blog.description}</p>
            </div>

            <button
              className="btn btn-primary"
              onClick={() => {
                navigate("/blog");
              }}
            >
              Go back
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SingleBlog;
