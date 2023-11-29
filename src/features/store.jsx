import { configureStore } from "@reduxjs/toolkit"

import AuthSlice from "./AuthSlice"
import FavoriteSlice from "./FavoriteSlice"
import HotelSlice from "./HotelSlice"
import ReservationSlice from "./ReservationSlice"
const store = configureStore({
    reducer:{
        auth : AuthSlice,
        favorites: FavoriteSlice,
        hotels : HotelSlice,
        reserve : ReservationSlice
    }
})

export default store