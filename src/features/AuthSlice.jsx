import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

export const getAsyncUsers = createAsyncThunk("users/getAsyncUsers", async (payload , {rejectWithValue})=>{
    try {
        const res = await axios.get("http://localhost:5000/users")
        return res.data
    } catch (error) {
        rejectWithValue(error.message)
    }
})

export const addAsyncUser = createAsyncThunk("users/addAsyncUser", async (payload , {rejectWithValue})=>{
    const newUser = {
        first_name:payload.first_name,
        last_name : payload.last_name,
        email:payload.email,
        password:payload.password,
        phoneNumber:payload.phoneNumber,
        national_id : payload.national_id
    }
    try {
        const res = await axios.post("http://localhost:5000/users" , newUser)
        return res.data
    } catch (error) {
        rejectWithValue(error.message)
    }
})

const AuthSlice = createSlice({
    name:"auth",
    initialState : { 
        loading : false,
        users :[],
        error:"",
        isAuthenticated :false
    },
    reducers:{
        authenticateUser : (state, action) =>{
            state.isAuthenticated = true,
            {...state}
        },
        logout: (state, action) =>{
            state.isAuthenticated = false,
            {...state}
        }        
    },
    extraReducers: {
       
        [getAsyncUsers.pending] : (state, action)=>{
            state.loading = true,
            state.users = [],
            state.error = "",
            state.isAuthenticated = false
        },
        [getAsyncUsers.fulfilled] : (state, action)=>{
            state.loading = false,
            state.users = action.payload,
            state.error = ""
        },
        [getAsyncUsers.rejected] : (state, action)=>{
            state.loading = false,
            state.users = [],
            state.error = action.payload,
            state.isAuthenticated = false
        },
        [addAsyncUser.pending] : (state, action)=>{
            state.loading = true
        },
        [addAsyncUser.fulfilled] : (state, action)=>{
            state.loading = false,
            state.isAuthenticated = true,
            state.users.push(action.payload)
        },
        
        
    }
})
export const {authenticateUser,logout} = AuthSlice.actions

export default AuthSlice.reducer

