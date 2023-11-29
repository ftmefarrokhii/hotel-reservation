import { createContext, useContext, useState } from "react"
import { useSearchParams } from 'react-router-dom';
import useFetch from "../hooks/useFetch";
import axios from "axios";

const HotelContext = createContext()
const BASE_URL = "http://localhost:5000/hotels"
export default function HotelProvider({children}){

    const[searchParams,setSearchParams] = useSearchParams()
    const destination = searchParams.get("destination")
    // const date = searchParams.get("date")
    const room = JSON.parse(searchParams.get("options"))?.room   // optional chon momkene vojud ndshte bshe
    // console.log(destination,date,options)

    const {isLoading,data : hotels} = useFetch(BASE_URL ,
     `name_like=${destination || ""}&accommodates_gte=${room || 1}`
    )
    const[currentHotel,setCurrentHotel] = useState(null)
    const[isLoadingCurrHotel,setIsLoadingCurrHotel] = useState(false)
    async function getHotel(id){
        try {
            setIsLoadingCurrHotel(true)
            const {data} = await axios.get(`${BASE_URL}/${id}`)
            setCurrentHotel(data) 
            setIsLoadingCurrHotel(false)
        } catch (error) {
            console.log(error)
            setIsLoadingCurrHotel(false)
        }
    }
    function EmptyCurrHotel(){
        setCurrentHotel(null)
    }

    return(
        <HotelContext.Provider value={{isLoading,hotels , getHotel , currentHotel,isLoadingCurrHotel,EmptyCurrHotel}}>
            {children}
        </HotelContext.Provider>
    )
}

export function useHotel(){
    return useContext(HotelContext)
}