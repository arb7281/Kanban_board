import React from 'react'
import "./Lane.css"
import Task from '../task/Task'

const Lane = ({title, laneId, loading, error, tasks, onDragStart, onDragOver, onDrop, setDeleteWindow}) => {
  return (
    <div className='Lane-wrapper' onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e, laneId)}>
    <h2>{title}</h2>
    <div className='Lane'>
      {
        loading || error 
        ? (<span>{error || "Loading..."}</span>) 
        : (tasks.map((task) => (
            <Task
                key={task.id}
                task={task}
                onDragStart={onDragStart} 
                setDeleteWindow={setDeleteWindow}
            />
        )))
      }
    </div>
    
    </div>
  )
}

export default Lane