import React, { useState } from "react";
import { Box, Button, Typography, TextField } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import  toast from 'react-hot-toast';
const Register = () => {
  const navigate = useNavigate();
  //state
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  //handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  //handlesubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:3001/user/register", {
        username: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success) {
        toast.success("User Register Successfully!");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form>
        <Box
          maxWidth={450}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          margin="auto"
          marginTop={5}
          padding={3} /* Add padding for spacing */
          boxShadow="0px 0px 20px rgba(0, 0, 0, 0.2)" /* Soften the shadow */
          borderRadius={
            4
          } /* Add a slight border radius for a card-like appearance */
          bgcolor="white" /* Set a white background color */
        >
          <Typography variant="h5" gutterBottom>
            Register
          </Typography>
          <TextField
            label="Name"
            value={inputs.name}
            onChange={handleChange}
            name="name"
            variant="outlined"
            margin="normal"
            type="text"
            fullWidth
            required
          />
          <TextField
            label="Email"
            value={inputs.email}
            onChange={handleChange}
            type="email"
            name="email"
            variant="outlined"
            margin="normal"
            fullWidth
            required
          />
          <TextField
            label="Password"
            value={inputs.password}
            onChange={handleChange}
            type="password"
            name="password"
            variant="outlined"
            margin="normal"
            fullWidth
            required
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            onClick={handleSubmit}
            style={{
              marginTop: "16px",
            }} /* Add some spacing below the fields */
          >
            Submit
          </Button>
          <Button
            onClick={() => {
              navigate("/login");
            }}
            variant="body2"
            style={{ marginTop: "16px" }}
            color="primary"
          >
            Already registered? Login
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Register;
