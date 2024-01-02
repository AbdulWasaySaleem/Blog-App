import express from "express";
import { BlogModel } from "../models/blogModel.js";
import { UserModel } from "../models/userModel.js";
import mongoose from "mongoose";

//router object
const router = express.Router();

//routes
//All Blogs || GET
router.get("/allblog", async (req, res) => {
  try {
    const blog = await BlogModel.find({}).populate('user');
    if (!blog) {
      return res.status(200).send({
        success: false,
        message: "No Blog Found...",
      });
    }
    return res.status(200).send({
      success: true,
      blogcount: blog.length,
      message: "All Blog List",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error While Getting Blog",
      error,
    });
  }
});

// Create Blog || POST
router.post("/createblog", async (req, res) => {
  try {
    const { title, description, image, user } = req.body;

    // Validation
    if (!title || !description || !image || !user) {
      return res.status(400).json({
        success: false,
        message: "Please provide all fields",
      });
    }

    const existingUser = await UserModel.findById(user);
    //validating
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "Unable to find user ",
      });
    }

    // Create a new blog post using the BlogModel
    const newBlog = new BlogModel({ title, description, image, user });
    //if EXISTINGUSER found, Push blog onto that id
    const session = await mongoose.startSession(); // Create a new Mongoose session for the transaction
    session.startTransaction(); // Start the transaction within the session
    await newBlog.save({ session }); // Save the new blog post within the transaction
    existingUser.blogs.push(newBlog); // Associate the new blog post with the existing user by pushing it into their "blogs" array
    await existingUser.save({ session }); // Save the modified user object (with the new blog) within the transaction
    await session.commitTransaction(); // Commit the transaction, making all the changes within the transaction permanent
    await newBlog.save(); // Save the new blog post to the database (assuming this is an async method)

    return res.status(201).json({
      success: true,
      message: "Blog created successfully",
      newBlog,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      success: false,
      message: "Error while creating blog",
      error: error.message, // Send the error message for debugging
    });
  }
});

//update Blog || PUT
router.put("/updateblog/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;
    const blog = await BlogModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Blog Updated",
      blog,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error while updating blog",
      error: error.message, // Send the error message for debugging
    });
  }
});

//Single Blog || GET
router.get("/getblog/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await BlogModel.findById(id);
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "Error Fetching SIngle Bloog...",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Fetching SIngle Bloog...",
      blog,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error while getting single blog",
      error: error.message, // Send the error message for debugging
    });
  }
});
//blog USer || GET
router.get('/userblog/:id', async(req,res)=>{
    try {
        const userBlog = await UserModel.findById(req.params.id).populate('blogs')
        if(!userBlog){
            return res.status(400).json({
                success: false,
                message: "blog not found by given id..."
              });
        }
        return res.status(200).send({
            success:true,
            message: 'user Blogs',
            userBlog
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
          success: false,
          message: "Error while getting single blog of a user",
          error: error.message, // Send the error message for debugging
        });
      }
})

// Delete Blog || DELETE
router.delete("/deleteblog/:id", async (req, res) => {
  try {
    // Find the blog by ID and populate the "user" field
    const blog = await BlogModel.findByIdAndDelete(req.params.id).populate(
      "user"
    );

    if (!blog) {
      // Handle the case where the blog with the specified ID was not found
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    if (blog.user) {
      // If the blog has a user associated with it
      // Remove the blog from the user's "blogs" array
      blog.user.blogs.pull(blog);
      await blog.user.save();
    }

    return res.status(200).send({
      success: true,
      message: "Blog Deleted (id api)",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Error while deleting single blog",
      error: error.message, // Send the error message for debugging
    });
  }
});

//exporting
export { router as blogsRouter };
