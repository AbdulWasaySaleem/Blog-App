import React, { useState } from "react";
import { Box, Button, Typography, TextField } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import  toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //state
  const [inputs, setInputs] = useState({
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
      const { data } = await axios.post("http://localhost:3001/user/login", {
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success){
        localStorage.setItem("userId", data?.user._id);
        dispatch(authActions.login())
        toast.success('User Login Successfully')
        navigate('/blog')
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
            Login
          </Typography>
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
              navigate("/register");
            }}
            variant="body2"
            style={{ marginTop: "16px" }}
            color="primary"
          >
            Not a user? please register!
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Login;
