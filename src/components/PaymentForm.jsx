import {useFormik} from 'formik'
import * as Yup from 'yup'
import { addAsyncReservation } from "../features/ReservationSlice"
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { useHotel } from '../context/HotelProvider';
import { useEffect } from 'react';

export default function PaymentForm(){
    const {id} = useParams()
    const {getHotel,isLoadingCurrHotel,currentHotel,EmptyCurrHotel} = useHotel()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        getHotel(id)
    },[id])

    const initialValues = {
        cart_number : "" , 
        Cv2 : "" , 
        Year : "" , 
        Month :"",
        password : "" ,  
        price : currentHotel.price
    }
    const validationSchema = Yup.object({
        cart_number : Yup.string().required('cart number is required').min(16,'cart number must 16 number'),
        Cv2 : Yup.string().required('Cv2 is required'),
        Year : Yup.string().required('year is required'),
        Month : Yup.string().required('Month is required'),
        password : Yup.string().required('password is required')
    })

    const onSubmit = (values) => {
        console.log(values);
        console.log(currentHotel);

        const newReserve = {values, currentHotel}
        dispatch(addAsyncReservation(newReserve))
        formik.resetForm()
        alert("reservation done!!!")
        navigate("/") 
    }
    const formik = useFormik(
        {
            initialValues ,
            onSubmit,
            validationSchema,
            validateOnMount : true,  
        }
    )
    
    return(
        <div className="loginContainer">
            <h2>Payment Page</h2>
            <form className="form" onSubmit={formik.handleSubmit}>
                <Input label="Cart Number" name="cart_number" formik={formik}/>
                <Input label="Cv2" name="Cv2" formik={formik}/>
                <Input label="Year" name="Year" formik={formik}/>
                <Input label="Month" name="Month" formik={formik}/>
                <Input label="Password" name="password" type="password" formik={formik}/>
                <Input label="payment" name="price" formik={formik}/>

                <div className="buttons">
                    <button className="btn btn--primary" type="submit" disabled={!formik.isValid}>
                        Pay
                    </button>
                </div>
            </form>
            
        </div>
    )
}


export function Input({label,name, formik , type="text"}){
    return(
        <div className="formControl">
            <label htmlFor={name}>{label}</label>
            <input type={type} name={name} id={name} {...formik.getFieldProps(name)}/>
            {formik.errors[name] && formik.touched[name] && <div className='error'>{formik.errors[name]}</div>}
        </div>
    )
}