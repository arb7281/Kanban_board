import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  editSingleTask: false,
  status: "idle",
  singleTask: null,
};

export const addTaskToServer = createAsyncThunk(
  "tasks/addTaskToServer",
  async (newTask, { rejectWithValue }) => {
    try{
      const response = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });

    if (!response.ok) {
      throw new Error("Failed to add task");
    }
    const data = await response.json()
    return data; // returns the newly added task with ID
  }catch(error){
    return rejectWithValue(error.message)
  }
})
  ;

export const deleteTaskFromServer = createAsyncThunk('tasks/deleteTaskFromServer', async (taskId) => {
    await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: 'DELETE',
    });
    return taskId; // returns the ID of the deleted task
  });

export const updateTaskOnServer = createAsyncThunk(
  "tasks/updateTaskOnServer",
  async (task) => {
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error("Failed to update task");
    }

    return await response.json(); 
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState: initialState,
  reducers: {
    setTasks(state, value) {
      state.tasks = value.payload;
    },
    setTasksAfterDeleteOne(state, value) {
      state.tasks = value.payload;
    },
    setEditSingleTask(state, value) {
      state.editSingleTask = value.payload;
    },
    setSingleTask(state, value) {
      state.singleTask = value.payload;
    },
    setTasksAfterLogout(state){
      state.tasks = []
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTaskToServer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addTaskToServer.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log("printing action.payload after task addition", action.payload)
        const newTask = action.payload
        state.tasks.push(action.payload); 
      })
      .addCase(addTaskToServer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateTaskOnServer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateTaskOnServer.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(updateTaskOnServer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteTaskFromServer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteTaskFromServer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
      })
      .addCase(deleteTaskFromServer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });;
  },
});

export const {
  setTasks,
  addTask,
  setTasksAfterDeleteOne,
  setEditSingleTask,
  setSingleTask,
  updateTaskLane,
  setTasksAfterLogout
} = tasksSlice.actions;

export default tasksSlice.reducer;
