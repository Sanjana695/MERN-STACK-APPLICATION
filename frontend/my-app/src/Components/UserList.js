import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

function UserList() {
  const [users, setUsers] = useState([]);

  const token = useSelector((state) => state.getTokenValue);
  console.log("in token", token);

  useEffect(() => {
    fetch("/userlist").then((result) => {
      result.json().then((resp) => {
        setUsers(resp);
      });
    });
  }, []);

  //delete user by id
  const deleteUser = async (id) => {
    try {
      await fetch(`/deleteUser/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Username</th>

            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((itm, i) => {
            return (
              <>
                <tr key={i}>
                  <td>{itm._id}</td>
                  <td>{itm.email}</td>
                  <td>{itm.username}</td>
                  <td>
                    <NavLink to={`/updateuser/${itm._id}`}>
                      <Button>Update</Button>
                    </NavLink>
                    <Button
                      className="btn btn-danger"
                      onClick={() => {
                        deleteUser(itm._id);
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}
export default UserList;
