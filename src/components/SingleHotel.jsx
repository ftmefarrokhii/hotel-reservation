import { Link, useNavigate, useParams} from "react-router-dom";
import { useHotel } from "../context/HotelProvider";
import { useEffect } from "react";
import { addAsyncReservation } from "../features/ReservationSlice";
import { useDispatch } from "react-redux";

export default function SingleHotel(){
    const {id} = useParams()

    const {getHotel,isLoadingCurrHotel,currentHotel,EmptyCurrHotel} = useHotel()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(()=>{
        getHotel(id)
    },[id])

    const reserveHandler = (currentHotel) => {
        console.log(currentHotel);
        dispatch(addAsyncReservation(currentHotel))
    }
    
    function backBtnHandler(){
        navigate(-1)
        EmptyCurrHotel()
    }

    if(isLoadingCurrHotel || !currentHotel) return <h1>loading...</h1>
    return(
        <div className="room">

            <h2>{currentHotel.name}</h2>
            <div>{currentHotel.smart_location}</div>

            <div className="roomDetail">

                <div className="roomDescription">
                    <img src={currentHotel.picture_url.url} alt={currentHotel.name}/>
                    <div className="roomFacilities">
                        facilities : {currentHotel.amenities.map((item)=> (
                        <div className="facilities-item">{item}</div>
                        )).slice(1,6)}
                    </div>
                </div>
                <div className="description">
                    <div>count of bedrooms : {currentHotel.bedrooms}</div>
                    <div>accommodates : {currentHotel.accommodates}</div>
                    <div>room_type : {currentHotel.room_type}</div>
                    <div>beds : {currentHotel.beds}</div>
                </div>
                
                <button className="btn btn--primary" onClick={()=>reserveHandler(currentHotel)}>
                    <Link to={`/book-hotel/${currentHotel.id}`}>
                    Book Now
                    </Link>
                </button>
                <button onClick={backBtnHandler} className="btn btn--back">&larr;back</button>

            </div>

        </div>
        
    )
}