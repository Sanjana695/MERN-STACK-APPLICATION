import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { getToken } from "../actions/index";
import getTokenValue from "../reducers/token";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { Zoom, Fade } from "react-reveal";

function Login() {
  const token = useSelector((state) => state.getTokenValue);
  console.log("token is" + token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const LoginUser = async (e) => {
    e.preventDefault();
    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const data = await res.json();
    if (res.status === 400 || !data) {
      window.alert("Invalid Credentials!");
    } else {
      dispatch(getToken(data.token));
      window.alert("Registeration Successfully!");
      navigate("/");
    }
  };
  return (
    <>
      <div className="container">
        <Zoom>
          <h1 className="text-center mt-5">Login</h1>
        </Zoom>
        <Fade>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="formBasicEmail"
              method="POST"
            >
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Enter Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <NavLink to="/">
              {" "}
              <Button
                variant="primary"
                type="submit"
                onClick={LoginUser}
                className="align-items-center justify-content-center"
              >
                Login
              </Button>
            </NavLink>
          </Form>
        </Fade>
      </div>
    </>
  );
}
export default Login;
