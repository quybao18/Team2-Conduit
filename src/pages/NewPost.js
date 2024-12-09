import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function NewPost({ show, handleClose }) {

  const [user, setUser] = useState(null);
  const [post, setPost] = useState([]);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = localStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
        const postResponse = await axios.get('http://localhost:9999/post');
        const categoriesResponse = await axios.get('http://localhost:9999/category');
        setPost(postResponse.data);
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [])

  const formatDate = (date) => {
    const year = date.getFullYear();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${day}-${month} ${hours}:${minutes}:${seconds}`;
  };


  const [addPost, setAddPost] = useState({
    title: '',
    description: '',
    favoriteCount: 0,
    createdTime: '',
    userId: null,
    categoryId: 1
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddPost({
      ...addPost,
      [name]: name === 'favoriteCount' || name === 'categoryId' ? parseInt(value) : value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentTime = formatDate(new Date());

    const newPost = {
      ...addPost,
      id: post.length + 1,
      userId: user.id,
      createdTime: currentTime
    }
    try {
      const response = await axios.post('http://localhost:9999/post', newPost);
      setPost((prevPosts) => [
        ...prevPosts,
        response.data
      ])
      alert('Post added successfully');
      handleClose();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }

  }


  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-primary fw-bold">Add New Post</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4" controlId="formTitle">
            <Form.Label className="fw-semibold">Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter post title"
              className="py-2"
              name='title'
              value={addPost.title}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formDescription">
            <Form.Label className="fw-semibold">Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Enter post description"
              className="py-2"
              name='description'
              value={addPost.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formCategory">
            <Form.Label className="fw-semibold">Category</Form.Label>
            <Form.Select className="py-2" name='categoryId' value={addPost.categoryId} onChange={handleChange}>
              {
                categories.map(cate => {
                  return <option key={cate.id} value={cate.id}>{cate.categoryName}</option>
                })
              }
            </Form.Select>
          </Form.Group>

          <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type='submit'>
              Publish Post
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default NewPost;
