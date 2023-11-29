import {MdLocationOn} from 'react-icons/md'
import {HiCalendar, HiLogout, HiMinus, HiPlus,HiSearch} from 'react-icons/hi'
import { useEffect, useRef, useState } from 'react'
import useOutsideClick from '../hooks/useOutsideClick'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
import { createSearchParams, json, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../features/AuthSlice';
import Modal from './Modal';
import {HeartIcon, TrashIcon} from '@heroicons/react/24/outline'
import { getAsyncFavorites ,removeAsyncFavorites} from '../features/FavoriteSlice';


export default function Header(){
    const[searchParams,setSearchParams]=useSearchParams()
    const[destination,setDestination] = useState(searchParams.get("destination") || "")
    const[openOptions,setOpenOptions] = useState(false)
    const[options,setOptions] = useState({adult:2,children:1,room:1})
    const [date,setDate]= useState([{
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    }]) 
    const[openDate,setOpenDate] = useState(false)
    const[open,setOpen] = useState(false)

    const navigate = useNavigate()

    function handleSearch(){
        // setSearchParams({date,options,destinaton})
        const encodedParams= createSearchParams({// chon date va options object an b ebarat ghabele fahm tabdil mikne
            date:JSON.stringify(date),
            destination,       // string niazi ndre
            options:JSON.stringify(options)
        })
        setSearchParams(encodedParams)
        navigate({
            pathname:"/hotels",
            search:encodedParams.toString()
        })
    }

    function handleOptions(name,operation){
        return(
            setOptions((prev)=>{
                return(
                    {
                        ...prev,
                        [name] : operation== 'inc' ? options[name] + 1 : options[name] - 1
                    }
                )
            })
        )
    }

    const { loading, error, users ,isAuthenticated } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const {favorites} = useSelector((state) => state.favorites)
    useEffect(()=>{
        dispatch(getAsyncFavorites())
    },[])
    function removeFavorite(item){
        dispatch(removeAsyncFavorites(item))
    }

    const logoutHandler =()=>{
        dispatch(logout())  
        console.log(isAuthenticated); 
    }
    return (
        <div className="header">
            <Modal title="title" open={open} onOpen={setOpen}>
                {favorites && favorites.map((fav)=>{
                    return (
                        <div className="list__item" key={fav.id}>
                            <img src={fav.picture_url.url} />
                            <h3 className="name">{fav.name}</h3>
                            <div className="list-item__info info">€&nbsp;{fav.price}&nbsp;<span>night</span></div>
                            
                            <button><TrashIcon className='icon red'
                            onClick={()=> removeFavorite(fav.id)}/>
                            </button>   
                        </div>
                    )
                })}
                
            </Modal>
            <div>
                <button className="heart" onClick={()=> setOpen(open => !open)}>
                    <HeartIcon className='icon' />
                    <span className='badge'>{favorites.length}</span>
                </button>
            </div>

            <div className="headerSearch">
                <div className="headerSearchItem">
                    <MdLocationOn className='headerIcon locationIcon'/>
                    <input type='text' placeholder='where to go?' className='headerSearchInput textField' 
                        value={destination} onChange={(e)=> setDestination(e.target.value)}
                        id='destination' name='destination'
                    />
                    <span className="seperator"></span>
                </div>
                <div className="headerSearchItem">
                    <HiCalendar className='headerIcon dateIcon'/>
                    <div className="dateDropDown" onClick={()=>setOpenDate(!openDate)}>
                        {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")}` }
                    </div>
                        {openDate && <DateRange className='date' minDate={new Date()}
                        ranges={date} onChange={(item)=>setDate([item.selection])} />}
                    <span className="seperator"></span>
                </div>
                <div className="headerSearchItem">
                    <div id='optionDropDown' onClick={()=> setOpenOptions(!openOptions)}>{options.adult} adult &bull; {options.children} children &bull;{options.room}room</div>
                    {openOptions && <GuestOptionList options={options} setOpenOptions={setOpenOptions} handleOptions={handleOptions}/>}
                    <span className="seperator"></span>
                </div>
                <div className="headerSearchItem">
                    <button className='headerSearchBtn' onClick={handleSearch}>
                        <HiSearch className='headerIcon'/>
                    </button>
                </div>
            </div>
            {isAuthenticated ?(
                <div className='logout'>
                    <span>log out</span>
                    <button onClick={logoutHandler}><HiLogout className='icon' /></button>
                </div> 
            ) : (
                <button onClick={()=> navigate('/signup')}>sign up </button>
            )
            }
        </div>
    )
}

export function GuestOptionList({options , handleOptions , setOpenOptions}){
    const optionsRef = useRef()
    useOutsideClick(optionsRef, "optionDropDown" ,()=> setOpenOptions(false))
    return(
        <div className='guestOptions' ref={optionsRef}>
            <OptionItem type="adult" options={options} minLimit={1} handleOptions={handleOptions}/>
            <OptionItem type="children" options={options} minLimit={0} handleOptions={handleOptions}/>
            <OptionItem type="room" options={options} minLimit={1} handleOptions={handleOptions}/>
        </div>
    )
}

export function OptionItem({options, type , minLimit , handleOptions}){
    
    return(
        <div className='guestOptionItem'>
            <span className='optionText'>{type}</span>
            <div className='optionCounter'>
                <button className='optionCounterBtn' disabled={options[type] <= minLimit}
                        onClick={()=> handleOptions(type, 'dec')}>
                    <HiMinus className='icon'/>
                </button>
                <span className='optionCounterNumber'>{options[type]}</span>
                <button className='optionCounterBtn' onClick={()=> handleOptions(type, 'inc')} >
                    <HiPlus className='icon'/>
                </button>
            </div>
        </div>
    )
}