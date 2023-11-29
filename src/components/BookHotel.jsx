import { useDispatch, useSelector } from "react-redux"
import { useSearchParams ,useParams } from 'react-router-dom';
import PaymentForm from "./PaymentForm";
import { useEffect, useState } from "react";
import { getAsyncReservation } from "../features/ReservationSlice";

export default function BookHotel(){
    const {reservationList,loading} = useSelector((state) => state.reserve)
    const {id} = useParams()
    console.log("currentHotel id",id);
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getAsyncReservation())
    },[dispatch])
    
    if(loading) return <h2>loading...</h2>

    const HotelReserved = reservationList && reservationList.find((item)=> item.id === id)
    console.log("HotelReserved",HotelReserved);

    return (
        <div>
            <PaymentForm price={HotelReserved.price}/>
        </div>
    )
}