import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();

  const postData = async (e) => {
    e.preventDefault();
    let data = { username, email, password };
    console.log(data);
    const res = await fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resp = await res.json();
    if (resp.status === 422 || !resp) {
      window.alert("Invalid Registration!");
    } else {
      window.alert("Registered Successfully!");
      navigate("/login");
    }
  };
  return (
    <div className="container">
      <h1 className="text-center mt-5">Sign Up</h1>
      <Form method="post">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

        <NavLink to="/login">
          <Button variant="primary" type="submit" onClick={postData}>
            Register
          </Button>
        </NavLink>
      </Form>
    </div>
  );
}
export default Register;
