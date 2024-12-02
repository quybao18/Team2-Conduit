import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Nav, Table, Button } from "react-bootstrap";
import { FaUserCircle, FaBell, FaCog, FaChartBar, FaUser, FaUsersCog, FaHome } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import HeaderAdmin from "../components/HeaderAdmin";
import axios from "axios";

function ManaCategory() {

  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

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
        <Col style={{ marginLeft: "10px" }} className="p-4 mt-5">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Category Name</th>
              </tr>
            </thead>

            <tbody>
              {
                categories.map((cate, index) => {
                  return <tr>
                    <td>{cate.id}</td>
                    <td>{cate.categoryName}</td>
                  </tr>
                })
              }
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  )
}

export default ManaCategory