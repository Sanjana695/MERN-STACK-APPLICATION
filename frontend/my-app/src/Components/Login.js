import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  const navigate = useNavigate();
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
      window.alert("Registeration Successfully!");
      navigate("/");
    }
  };
  return (
    <>
      <div className="container">
        <h1 className="text-center mt-5">Login</h1>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail" method="POST">
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
      </div>
    </>
  );
}
export default Login;
