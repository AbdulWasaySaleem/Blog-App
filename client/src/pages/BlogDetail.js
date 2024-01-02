import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import toast from "react-hot-toast";

const Blogdetail = () => {
  const [blog, setblog] = useState({});
  const [inputs, setInputs] = useState({

  });
  const id = useParams().id;
  const navigate = useNavigate()
  const getBlogDetail = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/blogs/getblog/${id}`
      );
      if (data?.success) {
        setblog(data?.blog);
      }
      setInputs({
        title: data?.blog.title,
        description: data?.blog.description,
        image: data?.blog.image
      })
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBlogDetail();
  }, [id]);

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:3001/blogs/updateblog/${id}`,
        {
          title: inputs.title,
          description: inputs.description,
          image: inputs.image,
          user: id,
        }
      );
      if (data?.success) {
        toast.success("Blog Updated");
        navigate("/myblog");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while creating the blog.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          width={"50%"}
          border={3}
          borderRadius={10}
          padding={3}
          margin="auto"
          boxShadow={"10px 10px 20px #ccc"}
          display="flex"
          flexDirection={"column"}
          marginTop="30px"
        >
          <Typography
            variant="h4"
            textAlign={"center"}
            fontWeight="bold"
            padding={3}
            color="primary"
          >
            Update a Blog Post
          </Typography>
          <InputLabel sx={{ mb: 1, mt: 2 }} htmlFor="title">
            Title
          </InputLabel>
          <TextField
            id="title"
            name="title"
            value={inputs.title}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />
          <InputLabel sx={{ mb: 1, mt: 2 }} htmlFor="description">
            Description
          </InputLabel>
          <TextField
            id="description"
            name="description"
            value={inputs.description}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />
          <InputLabel sx={{ mb: 1, mt: 2 }} htmlFor="image">
            Image URL
          </InputLabel>
          <TextField
            id="image"
            name="image"
            value={inputs.image}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />
          <Button
            type="submit"
            color="warning"
            variant="contained"
            style={{ marginTop: "16px" }}
          >
            Update
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Blogdetail;
