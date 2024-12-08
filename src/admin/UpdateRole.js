import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

function UpdateRole({ show, handleClose, userId }) {

  const [user, setUser] = useState({});
  const [roles, setRoles] = useState([]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get(`http://localhost:9999/user/${userId}`);
        const rolesResponse = await axios.get('http://localhost:9999/role');
        setUser(userResponse.data);
        setRoles(rolesResponse.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [userId])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: name === 'roleId' ? parseInt(value) : value
    })
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:9999/user/${userId}`, user);
      alert('Role updated successfully');
      handleClose();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Role</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p><strong>Name:</strong> {user.userName}</p>

        <Form onSubmit={handleUpdate}>
          <Form.Group className="mb-3" controlId="formRole">
            <Form.Label>Role</Form.Label>
            <Form.Control
              as="select"
              name="roleId"
              value={user.roleId}
              onChange={handleChange}
            >
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.roleName}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
            <Button variant="primary" type="submit">Save changes</Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>

  )
}

export default UpdateRole