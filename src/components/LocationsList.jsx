import { useEffect } from "react"
import { useDispatch ,useSelector } from "react-redux";
import { addAsyncFavorites, getAsyncFavorites } from "../features/FavoriteSlice";
import {useNavigate } from "react-router-dom";
import { getAsyncHotels } from "../features/HotelSlice";
import { useHotel } from "../context/HotelProvider";
import Accordions from "./Accordions";
export default function LocationsList(){
    
    const dispatch = useDispatch()
    const { hotels,loading,error } = useSelector((state) => state.hotels)
    const {getHotel,isLoadingCurrHotel,currentHotel} = useHotel()
    const {favorites} = useSelector((state)=> state.favorites)

    useEffect(()=>{
        dispatch(getAsyncHotels())
        dispatch(getAsyncFavorites())
    },[dispatch])

    function addFavoritesHandler(item){
        dispatch(addAsyncFavorites(item)) 
    }

    const navigate = useNavigate()
    const showMoreHandler = (hotelId)=>{
        getHotel(hotelId)
        navigate(`/hotels/${hotelId}?lat=${currentHotel.latitude}&lng=${currentHotel.longitude}`)
    }
    const isFavorite = (itemId) => {
        return favorites.some((favorite) => favorite.id === itemId);
      };
    return(
        <>   
        <div className="nearbyLocation">
            <h2>locations nearby</h2>
            <div className="locationList">
                {hotels && hotels.map((item)=>{
                    const isAddedToFavorites = isFavorite(item.id);
                    return (
                        <div className="locationItem" key={item.id}>
                            <img src={item.picture_url.url} alt={item.name} />
                            <div className="locationItemDesc">
                                <p className="location">{item.smart_location}</p>
                                <p className="name">{item.name}</p>
                                <p className="price">€&nbsp;{item.price}&nbsp;<span>night</span></p>
                            </div>
                            <div className="buttons hotel-btn">
                             <button className={`btn ${isAddedToFavorites ? "gray" : "btn--primary" }`} 
                                onClick={()=> addFavoritesHandler(item)} disabled={isAddedToFavorites}>
                                {isAddedToFavorites ? "already added" : "add to favorites"}
                             </button>
                            
                             <button className="btn btn--primary" onClick={()=> showMoreHandler(item.id)}>show more</button>
                           

                            </div>
                           
                        </div>
                    )
                })
                }
            </div>
        </div>
        <hr style={{backgroundColor:"lightgray", height:"0.1rem",marginBottom:"2rem",marginTop:"1rem"}}/>
        <div style={{marginBottom:"2rem" ,fontWeight:"500"}}>Frequently Asked Questions</div>
        <Accordions />
        </>
    )
}