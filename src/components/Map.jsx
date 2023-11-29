import { useEffect, useState } from "react"
import { useHotel } from "../context/HotelProvider"
import { MapContainer ,TileLayer, Marker,Popup,useMap, useMapEvent} from 'react-leaflet'
import useGeoLocation from "../hooks/useGeoLocation"
import { useNavigate, useSearchParams } from "react-router-dom"
import useUrlLocation from "../hooks/useUrlLocation"

export default function Map({markerLocation}){
    const[mapCenter,setMapCenter] = useState([52.1077703,4.8428184])
    const {isLoading:isLoadingPosition , position:geoLocationPosition , getPosition } =useGeoLocation()
   
    const[lat,lng] = useUrlLocation()

    console.log(lat,lng)
    useEffect(()=>{
        if(lat && lng ) setMapCenter([lat,lng])
    },[lat,lng])

    useEffect(()=>{
        if(geoLocationPosition?.lat && geoLocationPosition?.lng)
            setMapCenter([geoLocationPosition.lat , geoLocationPosition.lng])
    },[geoLocationPosition])

    return(
        <div className="mapContainer">
            <MapContainer className="map" zoom={9} scrollWheelZoom={true} center={mapCenter}>
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                <button onClick={getPosition} className="getLocation">
                    {isLoadingPosition ? "Loading ..." : "use my location"}
                </button>
                <DetectClick />
                <ChangeCenter position={mapCenter}/>
                {markerLocation.map((item)=>(
                    <Marker key={item.id} position={[item.latitude,item.longitude]} > 
                        <Popup>
                            {item.host_location}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

        </div>
        
    )
}
export function ChangeCenter({position}){
    const map = useMap()
    map.setView(position)
    return null
}

export function DetectClick(){
    const navigate = useNavigate()
    useMapEvent({   // useMapEvent bara ine k age rooye map click krd che kone
        // click : (e) => console.log(e)
        click : (e) => navigate(`/bookmark/add?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    })
    return null 
}