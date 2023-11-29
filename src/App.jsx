import Header from './components/Header'
import './App.css'
import LocationsList from './components/LocationsList'
import { Routes , Route } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import Hotels from './components/Hotels'
import HotelProvider from './context/HotelProvider'
import SingleHotel from './components/SingleHotel'
import Login from './components/Login'
import SignUp from './components/SignUp'
import { Provider } from 'react-redux'
import store from './features/store'
import BookHotel from './components/BookHotel'

function App() {  
 return(
    <Provider store={store}>
       <HotelProvider>
            <Header />
                
            <Routes>
                <Route path='/signup' element={<SignUp />}></Route>
                <Route path='/' element={<LocationsList />}></Route>

                <Route path='/hotels' element={<AppLayout />} >
                    <Route index element={<Hotels />} />
                    <Route path=':id' element={<SingleHotel />} />
                </Route>
                <Route path='/book-hotel/:id' element={<BookHotel />}></Route>
                <Route path='/login' element={<Login />}></Route>
            </Routes>
            
        </HotelProvider>
    </Provider>
 )
}

export default App