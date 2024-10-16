import React, { useState, useEffect, memo } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { addTaskToServer, updateTaskOnServer } from '../../slices/tasksSlice';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../slices/modalSlice';
// import { useCallback } from 'react';
import "./TaskModal.css"


const TaskModal = () => {
  const {user} = useSelector((state) => state.auth)
  // console.log("printing user object in TaskModal", user)
  const [task, setTask] = useState({
    title: '',
    lane: 1,
    priority: 'medium',
    deadline: '',
    userId: user?.id
  });

  const {showModal, taskToEdit} = useSelector((state) => state.modal)
  
  const dispatch = useDispatch()
  const isEditing = !!taskToEdit 

  useEffect(() => {
    if (taskToEdit) {
      setTask(taskToEdit);
    } else {
      setTask({
        title: '',
        lane: 1,
        priority: 'medium',
        deadline: '',
        userId: user?.id
      });
    }
  }, [taskToEdit])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      dispatch(updateTaskOnServer(task));
    } else {
      dispatch(addTaskToServer(task));
    }

    dispatch(closeModal(null));
  };

  const isOption4Disabled = !(task.lane === '2' || task.lane === '3');

  return (
    <Modal show={showModal} onHide={()=> dispatch(closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title>{isEditing ? 'Edit Task' : 'Create New Task'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formTaskTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
              placeholder="Enter task title"
              required
            />
          </Form.Group>

          <Form.Group controlId="formTaskLane">
            <Form.Label>Lane</Form.Label>
            <Form.Control
              as="select"
              name="lane"
              value={task.lane}
              onChange={handleChange}
            >
              <option value={1}>Backlog</option>
              <option value={2}>ToDo</option>
              <option value={3}>Ongoing</option>
              <option value={4} disabled={isOption4Disabled}>Done</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formTaskPriority">
            <Form.Label>Priority</Form.Label>
            <Form.Control
              as="select"
              name="priority"
              value={task.priority}
              onChange={handleChange}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formTaskDeadline">
            <Form.Label>Deadline</Form.Label>
            <Form.Control
              type="date"
              name="deadline"
              value={task.deadline}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <br/>
          <Button variant="primary" type="submit">
          {isEditing ? 'Update Task' : 'Create Task'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default TaskModal;
