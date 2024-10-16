import {combineReducers} from "@reduxjs/toolkit";

import authReducer from "../slices/authSlice"
import tasksReducer from "../slices/tasksSlice"
import modalReducer from "../slices/modalSlice"

const rootReducer  = combineReducers({
    auth: authReducer,
    tasks: tasksReducer,
    modal: modalReducer
})

export default rootReducer