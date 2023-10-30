import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    User_id:"",
    UserName:"",
    Email:"",
    Gender:"",
    DateOfBirth:"",
    Contry:"",
    Image:"",
    isLoggedIn: false,
    token:""
  },
  reducers: {
    addUser: (state,action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.

      state.User_id = action.payload.User_id;
      state.UserName = action.payload.Username;
      state.Contry = action.payload.Contry;
      state.Email = action.payload.Email;
      state.Gender = action.payload.Gender;
      state.DateOfBirth = action.payload.DateOfBirth;
      state.Image = action.payload.Image;
      state.isLoggedIn = true;
      localStorage.setItem("userInfo",JSON.stringify(action.payload));
      localStorage.setItem("isLoggedIn",state.isLoggedIn);
    },
    setToken:(state,action)=>{
      state.token = action.payload
      localStorage.setItem("token",action.payload);

    }
    // decrement: (state) => {
    //   state.value -= 1
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload
    // },
  },
})

// Action creators are generated for each case reducer function
export const { addUser,setToken } = userSlice.actions

export default userSlice.reducer