import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Nav, Table, Button, Form } from "react-bootstrap";
import { FaUserCircle, FaBell, FaCog, FaChartBar, FaUser, FaUsersCog, FaHome } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import HeaderAdmin from "../components/HeaderAdmin";
import axios from "axios";

function ManaCategory() {

  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await axios.get('http://localhost:9999/category');
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [])

  const [addCate, setAddCate] = useState({
    categoryName: ''
  })

  const handleChange = (e) => {
    const {name, value} = e.target;
    setAddCate({
      ...addCate,
      [name] : value
    })
  }

  const handleAddCate = async (e) => {
    e.preventDefault();
    try {
      const newCate = {...addCate, id: categories.length + 1};
      await axios.post('http://localhost:9999/category', newCate);
      alert('Category added successfully');
      setAddCate({
        categoryName: ''
      })
      navigate('/manaCategory');
    } catch (error) {
      console.log(error);
    }
  }


  const handleDelete = async (cid) => {
    const confirm = window.confirm('Are you sure you want to delete this category?');
    if(confirm){
      try {
        await axios.delete(`http://localhost:9999/category/${cid}`);
        setCategories(categories.filter(cate => cate.id !== cid));
      } catch (error) {
        console.log(error);
      }
    }
  }


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
              <Form onSubmit={handleAddCate}  className="d-flex gap-2">
                <Form.Control
                  type="text"
                  placeholder="New Category"
                  name='categoryName'
                  value={addCate.categoryName}
                  onChange={handleChange}
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
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category, index) => (
                    <tr key={category.id}>
                      <td>{index + 1}</td>
                      <td>{category.categoryName}</td>
                      <td>
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
        </Col>
      </Row>
    </Container>
  )
}

export default ManaCategory