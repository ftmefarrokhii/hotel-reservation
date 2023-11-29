import { Outlet } from "react-router-dom";
import Map from "./Map";
import { useHotel } from "../context/HotelProvider";
export default function AppLayout(){
    const {hotels} = useHotel()
   

    return(
        <div className="appLayout">
            <div className="sidebar">
                <Outlet />  
            </div>  
            
            <Map markerLocation={hotels}/>
        </div>
    )
}