import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import HeaderAdmin from "../components/HeaderAdmin";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Đăng ký các thành phần cần thiết của Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Setting() {
  const [dashboardData, setDashboardData] = useState({
    totalPosts: 0,
    totalUsers: 0,
    totalComments: 0,
    totalCategories: 0,
  });
  const [postsByMonth, setPostsByMonth] = useState([]);
  const [availableYears, setAvailableYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, postsRes, commentsRes, categoriesRes] = await Promise.all([
          axios.get("http://localhost:9999/user"),
          axios.get("http://localhost:9999/post"),
          axios.get("http://localhost:9999/comment"),
          axios.get("http://localhost:9999/category"),
        ]);

        setDashboardData({
          totalUsers: usersRes.data.length,
          totalPosts: postsRes.data.length,
          totalComments: commentsRes.data.length,
          totalCategories: categoriesRes.data.length,
        });

        // Lấy danh sách các năm từ bài viết
        const posts = postsRes.data;
        const years = [...new Set(posts.map((post) => new Date(post.createdTime).getFullYear()))];
        setAvailableYears(years);

        // Thống kê số bài viết theo tháng của năm hiện tại
        filterPostsByYear(posts, selectedYear);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, [selectedYear]);

  const filterPostsByYear = (posts, year) => {
    const monthlyCounts = Array(12).fill(0);
    posts.forEach((post) => {
      const postDate = new Date(post.createdTime);
      if (postDate.getFullYear() === year) {
        const month = postDate.getMonth();
        monthlyCounts[month]++;
      }
    });
    setPostsByMonth(monthlyCounts);
  };

  // Dữ liệu biểu đồ
  const chartData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: `Number of Posts in ${selectedYear}`,
        data: postsByMonth,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Monthly Posts Statistics for ${selectedYear}`,
      },
    },
  };

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
          {/* Dashboard Section */}
          <div id="dashboard" className="mb-5">
            <h3 className="mb-4">Dashboard</h3>
            <Row className="g-4">
              <Col md={3}>
                <Card
                  className="text-center shadow-sm"
                  style={{ borderRadius: "15px" }}
                >
                  <Card.Body>
                    <Card.Title>Total Posts</Card.Title>
                    <Card.Text className="fs-4 text-primary">
                      {dashboardData.totalPosts}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3}>
                <Card
                  className="text-center shadow-sm"
                  style={{ borderRadius: "15px" }}
                >
                  <Card.Body>
                    <Card.Title>Total Users</Card.Title>
                    <Card.Text className="fs-4 text-success">
                      {dashboardData.totalUsers}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3}>
                <Card
                  className="text-center shadow-sm"
                  style={{ borderRadius: "15px" }}
                >
                  <Card.Body>
                    <Card.Title>Total Comments</Card.Title>
                    <Card.Text className="fs-4 text-warning">
                      {dashboardData.totalComments}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3}>
                <Card
                  className="text-center shadow-sm"
                  style={{ borderRadius: "15px" }}
                >
                  <Card.Body>
                    <Card.Title>Total Categories</Card.Title>
                    <Card.Text className="fs-4 text-info">
                      {dashboardData.totalCategories}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>

          {/* Chart Section */}
          <div id="chart" className="mt-5">
            <h3 className="mb-4">Post Statistics</h3>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end", // Căn phải. Đổi thành 'flex-start' nếu muốn căn trái.
                marginBottom: "10px",
              }}
            >
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                style={{
                  width: "150px",
                  height: "35px",
                  fontSize: "14px",
                  padding: "5px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              >
                {availableYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <Card className="shadow-sm" style={{ borderRadius: "15px" }}>
              <Card.Body>
                <Bar data={chartData} options={chartOptions} />
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Setting;
