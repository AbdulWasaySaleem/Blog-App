import React, { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import  toast from 'react-hot-toast';

const Navbar = () => {
  //global state
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId")
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleLogout =()=>{
    try {
      dispatch(authActions.logout())
      toast.success('Logout Successfully')
      navigate('/login')
      localStorage.clear()
    } catch (error) {
      console.log(error)
    }
  }

  const [value, setvalue] = useState();
  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h4">My Blog App</Typography>
          {isLogin && (
            <Box display={"flex"} marginLeft="auto" marginRight={"auto"}>
              <Tabs
                textColor="red"
                value={value}
                onChange={(e, val) => {
                  setvalue(val);
                }}
              >
                <Tab label="Blog" LinkComponent={Link} to="/blog" />
                <Tab label="My Blogs" LinkComponent={Link} to="/myblog" />
                <Tab label="Create Blogs" LinkComponent={Link} to="/createblog" />
              </Tabs>
            </Box>
          )}
          <Box display={"flex"} marginLeft="auto">
            {!isLogin && (
              <>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/Login"
                >
                  Login
                </Button>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/Register"
                >
                  Register
                </Button>
              </>
            )}
            {isLogin && <Button onClick={handleLogout} sx={{ margin: 1, color: "white" }}>LogOut</Button>}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
