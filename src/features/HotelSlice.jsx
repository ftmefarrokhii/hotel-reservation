import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

export const getAsyncHotels = createAsyncThunk("hotels/getAsyncHotels", async (payload , {rejectWithValue})=>{
    try {
        const res = await axios.get("http://localhost:5000/hotels")
        return res.data
    } catch (error) {
        rejectWithValue(error.message)
    }
})

const HotelSlice = createSlice({
    name:"hotels",
    initialState : { 
        loading : false,
        hotels :[],
        error:"",
    },
    extraReducers: {
        [getAsyncHotels.pending] : (state, action)=>{
            state.loading = true,
            state.hotels = [],
            state.error = ""
        },
        [getAsyncHotels.fulfilled] : (state, action)=>{
            state.loading = false,
            state.hotels = action.payload,
            state.error = ""
        },
        [getAsyncHotels.rejected] : (state, action)=>{
            state.loading = false,
            state.hotels = [],
            state.error = action.payload
        } 
    }
})

export default HotelSlice.reducer

