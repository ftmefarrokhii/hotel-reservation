import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

export const getAsyncReservation = createAsyncThunk("reservation/getAsyncReservation", async (payload , {rejectWithValue})=>{
    try {
        const res = await axios.get("http://localhost:5000/reservationList")
        return res.data
    } catch (error) {
        rejectWithValue(error.message)
    }
})

export const addAsyncReservation = createAsyncThunk("reservation/getAsyncReservation", async (payload , {rejectWithValue})=>{
    try {
        const res = await axios.post("http://localhost:5000/reservationList" , payload)
        console.log("reserve payload",res.data);
        return res.data
    } catch (error) {
        rejectWithValue(error.message)
    }
})

const ReservationSlice = createSlice({
    name:"reservationList",
    initialState : { 
        loading : false,
        reservationList :[],
        error:""
    },
    extraReducers: { 
        [getAsyncReservation.pending] : (state, action)=>{
            state.loading = true,
            state.reservationList = [],
            state.error = ""
        },
        [getAsyncReservation.fulfilled] : (state, action)=>{
            state.loading = false,
            state.reservationList = action.payload,
            state.error = ""
        },
        [getAsyncReservation.rejected] : (state, action)=>{
            state.loading = false,
            state.reservationList = [],
            state.error = action.payload
        },
        [addAsyncReservation.pending] : (state, action)=>{
            state.loading = true
        },
        [addAsyncReservation.fulfilled] : (state, action)=>{
            state.loading = false,
            state.reservationList= [...state.reservationList , action.payload]
            state.error = ""
        }     
    }
})

export default ReservationSlice.reducer

