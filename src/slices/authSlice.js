import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunks for registration and login
export const registerUser = createAsyncThunk('auth/registerUser', async (userData) => {
  const response = await fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  return response.json();
});



export const loginUser = createAsyncThunk('auth/loginUser', async (credentials) => {
    const response = await fetch('http://localhost:3000/users');
    const users = await response.json();
    
    const user = users.find(user => 
      (user.email === credentials.emailOrUsername || user.username === credentials.emailOrUsername) 
      && user.password === credentials.password
    );
  
    if (user) {
      // console.log("printing user", user)
      return user;
      
      
    } else {
      alert('Invalid credentials');
    }
  });


  const authSlice = createSlice({
    name: 'auth',
    initialState: { 
      user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem("user")) : null, 
      status: 'idle', 
      error: null,
      isLoggedIn: false
       },
    reducers: {
      logOut: (state) =>{
          localStorage.removeItem('user')
          state.user = null
          state.isLoggedIn = false
      },
      setIsLoggedIn(state, value){
        state.isLoggedIn = value.payload
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(registerUser.fulfilled, (state, action) => {
          // state.user = null;
          // localStorage.setItem('user', JSON.stringify(action.payload)); 
          console.log("registration successful");
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          state.user = action.payload;
          state.isLoggedIn = true
          localStorage.setItem('user', JSON.stringify(action.payload)); 
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.error = action.error.message;
          state.user = null;
          localStorage.removeItem('user'); 
          // console.log('login failed: ', action.error.message);
        });
    },
  });
  
  export const {logOut} = authSlice.actions

export default authSlice.reducer;
