import React from "react";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  return (
    <>
      <div className="container">
        <h1 className="text-center mt-5">Login</h1>
        <Form>
          <Form.Group
            className="mb-3"
            controlId="formBasicEmail"
            // enctype="multipart"
          >
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter Username" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Enter Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="align-items-center justify-content-center"
          >
            Login
          </Button>
        </Form>
      </div>
    </>
  );
}
export default Login;
