import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { Box, IconButton } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import  toast from 'react-hot-toast';

export default function BlogCard({
  title,
  description,
  image,
  username,
  time,
  id,
  isUser,
}) {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/blogdetail/${id}`);
  };
  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(
        `http://localhost:3001/blogs/deleteblog/${id}`
      );
      if (data?.success) {
        toast.success("Blog Deleted Successfully");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
      <Card
        sx={{
          width: "60%",
          margin: "auto",
          mt: 5,
          padding: 2,
          boxShadow: "5px 5px 10px #ccc",
          ":hover:": { boxShadow: "10px 10px 20px #ccc" },
        }}
      >
        {isUser && (
          <Box display={"flex"}>
            <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
              <ModeEditIcon />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </Box>
        )}
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {username}
            </Avatar>
          }
          title={title}
          subheader={time}
        />
        <CardMedia
          component="img"
          height="auto"
          image={image}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Title: <b>{title}</b>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Description: {description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}