

import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

export const getAsyncFavorites = createAsyncThunk("favorites/getAsyncFavorites", async (payload , {rejectWithValue})=>{
    try {
        const res = await axios.get("http://localhost:5000/favorites")
        return res.data
    } catch (error) {
        rejectWithValue(error.message)
    }
})

export const addAsyncFavorites = createAsyncThunk("favorites/addAsyncFavorites", async (payload , {rejectWithValue})=>{
    try {
        console.log("payload",payload);
        const res = await axios.post("http://localhost:5000/favorites" , payload)
        return res.data
    } catch (error) {
        rejectWithValue(error.message)
    }
})
export const removeAsyncFavorites = createAsyncThunk("favorites/removeAsyncFavorites", async (payload , {rejectWithValue})=>{
    try {
        console.log("payload id : ",payload);
        await axios.delete(`http://localhost:5000/favorites/${payload}`)
        console.log("payload.id remove shode",payload);

        return {id: payload}
    } catch (error) {
        rejectWithValue(error.message)
    }
})

const FavoriteSlice = createSlice({
    name:"favorites",
    initialState : { 
        loading : false,
        favorites :[],
        error:"",
    },
    extraReducers:{
        [getAsyncFavorites.pending] : (state, action)=>{
            state.loading = true,
            state.favorites = [],
            state.error = ""
        },
        [getAsyncFavorites.fulfilled] : (state, action)=>{
            state.loading = false,
            state.favorites = action.payload,
            state.error = ""
        },
        [getAsyncFavorites.rejected] : (state, action)=>{
            state.loading = false,
            state.favorites = [],
            state.error = action.payload
        },
        [addAsyncFavorites.pending] : (state, action)=>{
            state.loading = true
        },
        [addAsyncFavorites.fulfilled] : (state, action)=>{
            state.loading = false,
            state.favorites= [...state.favorites , action.payload]
        },
        [addAsyncFavorites.rejected] : (state, action)=>{
            state.loading = false,
            state.favorites = [],
            state.error = action.payload
        },
        [removeAsyncFavorites.fulfilled] : (state, action)=>{
            state.loading = false,
            state.favorites = state.favorites.filter((fav)=> fav.id !== action.payload.id)
        
        }
        
    }
})
export const {addToFavorites} = FavoriteSlice.actions

export default FavoriteSlice.reducer

