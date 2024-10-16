import React from "react";
import { useState, useEffect } from "react";
import Lane from "../../components/lane/Lane";
import "./Board.css";
import { Button } from "react-bootstrap";
import CreateTaskModal from "../../components/modals/TaskModal";
import { useDispatch } from "react-redux";
import { updateTaskOnServer } from "../../slices/tasksSlice";
import { openModal } from "../../slices/modalSlice";
import { deleteTaskFromServer } from "../../slices/tasksSlice";
import {Container, Row, Col, Modal} from "react-bootstrap";

function onDragStart(e,taskId) {
  e.dataTransfer.setData("id", taskId);
  // e.dataTransfer.setData("task", task)
}

function onDragOver(e) {
  e.preventDefault();
}

const Board = ({ tasks, error, loading }) => {
  const lanes = [
    { id: 1, title: "Backlog" },
    { id: 2, title: "ToDo" },
    { id: 3, title: "Ongoing" },
    { id: 4, title: "Done" },
  ];

  const dispatch = useDispatch();
  const [deleteWindow, setDeleteWindow] = useState(false);

  const onDrop = (e, newLaneId) => {
    const taskId = e.dataTransfer.getData("id");
    const task = tasks.find((task) => task.id === taskId)
    dispatch(updateTaskOnServer({...task, lane:newLaneId}))
    setDeleteWindow(false)
  };

  return (
    <div>
      <br />
      <Button variant="primary" onClick={() => dispatch(openModal())}>
        Create Task
      </Button>
      <div className="Board-wrapper">
        {lanes.map((lane) => (
          <Lane
            key={lane.id}
            laneId={lane.id}
            title={lane.title}
            loading={loading}
            error={error}
            tasks={tasks.filter((task) => lane.id === parseInt(task.lane))}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDrop={onDrop}
            setDeleteWindow={setDeleteWindow}
          />
        ))}

        <CreateTaskModal />
        <div
          style={{
            display: deleteWindow ? "block" : "none",
            height: "100px",
            backgroundColor: "red",
            color: "white",
            textAlign: "center",
            lineHeight: "100px",
            position: "fixed",
            bottom: 0,
            width: "90%",
            zIndex: 1000,
            marginTop: "2%",
            borderRadius: "15px"
          }}

          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            const taskId = e.dataTransfer.getData("id");
            dispatch(deleteTaskFromServer(taskId));
            setDeleteWindow(false)
          }}
        >
          Drop here to delete
        </div>
      </div>
    </div>

  );
};

export default Board;
