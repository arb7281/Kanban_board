import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "./Dashboard.css"

const Dashboard = () => {
  const {user} = useSelector((state)=> state.auth)
  const {tasks} = useSelector((state) => state.tasks)
  const newTasks = tasks.filter((task) => task.userId === user?.id)

  const navigate = useNavigate()

  return (
    <Container className="my-4">
    <h2 className="text-center mb-4">Dashboard</h2>
    <Row xs={1} sm={2} md={3} lg={3} className="g-4">
      <Col>
        <Card className="shadow-sm border-0">
          <Card.Body>
            <Card.Title className="text-primary">Total Tasks</Card.Title>
            <Card.Text className="fs-3">{newTasks.length}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card className="shadow-sm border-0">
          <Card.Body>
            <Card.Title className="text-success">Completed Tasks</Card.Title>
            <Card.Text className="fs-3">
              {newTasks.filter((task) => task.lane === 4).length}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card className="shadow-sm border-0">
          <Card.Body>
            <Card.Title className="text-warning">Pending Tasks</Card.Title>
            <Card.Text className="fs-3">
              {newTasks.filter(
                (task) => task.lane === 1 || task.lane === 2 || task.lane === 3
              ).length}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
    <div className="d-flex justify-content-center mt-4">
      <Button variant="primary" className="w-50" onClick={() => navigate('/board')}>
        Task Management
      </Button>
    </div>
  </Container>
  );
};

export default Dashboard;
