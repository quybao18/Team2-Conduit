import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Table, Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import HeaderAdmin from "../components/HeaderAdmin";
import axios from "../api/contacts"; // Axios instance

function ManaCategory() {
  const navigate = useNavigate();

  // State variables
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get("/category");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Create a new category
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;

    try {
      const response = await axios.post("/category", {
        id: String(categories.length + 1),
        categoryName: newCategory,
      });
      setCategories([...categories, response.data]);
      setNewCategory("");
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  // Delete a category
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/category/${id}`);
      setCategories(categories.filter((category) => category.id !== id));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  // Update a category
  const handleUpdate = async () => {
    if (!editingCategory?.categoryName.trim()) return;

    try {
      const response = await axios.put(`/category/${editingCategory.id}`, {
        categoryName: editingCategory.categoryName,
      });
      setCategories(
        categories.map((category) =>
          category.id === editingCategory.id ? response.data : category
        )
      );
      setEditingCategory(null);
      setShowModal(false);
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  // Open Modal for editing
  const openEditModal = (category) => {
    setEditingCategory(category);
    setShowModal(true);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Container fluid className="bg-light" style={{ minHeight: "100vh" }}>
      {/* Header */}
      <HeaderAdmin />

      <Row>
        {/* Sidebar */}
        <Col
          md="auto"
          style={{
            width: "250px",
            background: "#2c3e50",
            color: "white",
            padding: 0,
          }}
        >
          <Sidebar />
        </Col>

        {/* Main Content */}
        <Col style={{ marginLeft: "10px" }} className="p-4">
        <h3 className="mb-4">Manage Category</h3>

          {/* Form to Add a New Category */}
          <Row className="my-3">
            <Col md={{ span: 6, offset: 3 }}>
              <Form onSubmit={handleCreate} className="d-flex gap-2">
                <Form.Control
                  type="text"
                  placeholder="New Category"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                />
                <Button type="submit" variant="success">
                  Add
                </Button>
              </Form>
            </Col>
          </Row>

          {/* Display Categories in a Table */}
          <Row>
            <Col>
              <Table striped bordered hover responsive className="text-center">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Category Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category, index) => (
                    <tr key={category.id}>
                      <td>{index + 1}</td>
                      <td>{category.categoryName}</td>
                      <td>
                        <Button
                          variant="primary"
                          className="me-2"
                          onClick={() => openEditModal(category)}
                        >
                          Update
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(category.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>

          {/* Modal for Editing Category */}
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Category Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={editingCategory?.categoryName || ""}
                    onChange={(e) =>
                      setEditingCategory({
                        ...editingCategory,
                        categoryName: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleUpdate}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
}

export default ManaCategory;
