import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    showModal: false,
    taskToEdit: null,
    editTask: false
  },
  reducers: {
    openModal: (state, action) => {
        if (action.payload === null) {
            state.showModal = true;
            state.taskToEdit = null;
            state.editTask = false;
          } else {
            state.showModal = true;
            state.taskToEdit = action.payload;
            state.editTask = true;
          }
    },
    closeModal: (state) => {
      state.showModal = false;
      state.taskToEdit = null;
      state.editTask = false
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
