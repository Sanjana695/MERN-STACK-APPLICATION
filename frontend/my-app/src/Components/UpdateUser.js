import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function UpdateUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();

  const token = useSelector((state) => state.getTokenValue);
  console.log("in token", token);
  useEffect(() => {
    //  async function ShowData(){
    try {
      fetch(`/getId/${id}`, {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then((res) =>
        res.json().then((data) => {
          console.log(data);
          setUsername(data.username);
          setEmail(data.email);
        })
      );
    } catch (err) {
      console.log(err);
    }
    //ShowData();
  }, []);

  //update User
  const updateUser = () => {
    let data = { username, email };
    try {
      fetch(`/updateUser/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.username);
          navigate("/userlist");
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="container">
        <h1 className="text-center mt-5">Update User</h1>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Enter Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            onClick={() => {
              updateUser();
            }}
            className="align-items-center justify-content-center"
          >
            Update
          </Button>
        </Form>
      </div>
    </>
  );
}
export default UpdateUser;
