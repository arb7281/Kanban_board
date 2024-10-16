import React, { useState, useEffect } from "react";
import "./Task.css";
import { updateTaskOnServer } from "../../slices/tasksSlice";
import { useDispatch } from "react-redux";
import TaskModal from "../modals/TaskModal";
import { openModal } from "../../slices/modalSlice";
import ConfirmDeleteModal from "../modals/ConfirmDeleteModal";
import { deleteTaskFromServer } from "../../slices/tasksSlice";

const Task = ({ task, onDragStart, setDeleteWindow }) => {
  const [isPrevDisabled, setIsPrevDisabled] = useState(false);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsPrevDisabled(task.lane === 1);
    setIsNextDisabled(task.lane === 4);
  }, [task.lane]);

  function handleOpenDeleteModal(taskId) {
    setTaskToDelete(taskId);
    setShowDeleteModal(true);
  }

  function handleCloseDeleteModal() {
    setShowDeleteModal(false);
    setTaskToDelete(null);
  }

  function handleDeleteTask() {
    if (taskToDelete) {
      dispatch(deleteTaskFromServer(taskToDelete));
    }

    handleCloseDeleteModal();
  }

  const getPriorityStyles = (priority) => {
    switch (priority) {
      case "high":
        return { color: "white", backgroundColor: "#dc3545" };
      case "medium":
        return { color: "black", backgroundColor: "#fd7e14" };
      case "low":
        return { color: "white", backgroundColor: "#28a745" };
      default:
        return { color: "black", backgroundColor: "transparent" };
    }
  };

  const { color, backgroundColor } = getPriorityStyles(task.priority);

  return (
    <div
      className="Task-wrapper"
      draggable
      onDragStart={(e) => {
        setDeleteWindow(true);
        onDragStart(e, task.id);
      }}
    >
      <h3>Task : {task.title} </h3>
      <p>
        Priority:{" "}
        <span
          style={{
            color,
            backgroundColor,
            padding: "0.2em 0.5em",
            borderRadius: "4px",
          }}
        >
          {task.priority}
        </span>
      </p>
      <p>DeadLine : {task.deadline}</p>
      <div className="d-flex flex-wrap justify-content-between">
        <button
          className="btn btn-secondary mb-2"
          disabled={isPrevDisabled}
          onClick={() =>
            dispatch(updateTaskOnServer({ ...task, lane: task.lane - 1 }))
          }
        >
          Prev
        </button>
        <button
          className="btn btn-secondary mb-2"
          disabled={isNextDisabled}
          onClick={() =>
            dispatch(updateTaskOnServer({ ...task, lane: task.lane + 1 }))
          }
        >
          Next
        </button>
        <button
          className="btn btn-primary mb-2"
          onClick={() => dispatch(openModal(task))}
        >
          Edit
        </button>
        <button
          className="btn btn-danger mb-2"
          onClick={() => handleOpenDeleteModal(task.id)}
        >
          Delete
        </button>
      </div>

      <TaskModal />
      <ConfirmDeleteModal
        show={showDeleteModal}
        handleCloseDeleteModal={handleCloseDeleteModal}
        handleDeleteTask={handleDeleteTask}
      />
    </div>
  );
};

export default Task;
