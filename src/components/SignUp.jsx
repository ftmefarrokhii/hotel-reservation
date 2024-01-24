import {useFormik} from 'formik'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { addAsyncUser } from '../features/AuthSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react"

export default function SignUp(){
    const navigate = useNavigate()
    const { isAuthenticated } = useSelector((state) => state.auth)
    
    useEffect(()=>{
        if(isAuthenticated) navigate('/' , {replace: true })
        console.log("isAuthenticated : ",isAuthenticated);
    },[isAuthenticated])
    const dispatch = useDispatch()

    const initialValues = {
        first_name : "" , 
        last_name : "" , 
        email : "" , 
        password : "" ,  
        phoneNumber :"" , 
        national_id :""
    }
    const validationSchema = Yup.object({
        first_name : Yup.string().required('FirstName is required').min(6,'FirstName must be at least 6 character'),
        last_name : Yup.string().required('LastName is required'),
        email : Yup.string().email('invalid email format').required('email is required'),
        phoneNumber : Yup.string()
            .required('phoneNumber is required')
            .matches(/^[0-9]{11}$/,'phone number must be 11 number')
            .nullable(),
        password : Yup.string().required('password is required'),
        national_id : Yup.string().required('National Id is required')
    })

    const onSubmit = (values) => {
        console.log(values);
        dispatch(addAsyncUser(values))
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
            <h2>Sign Up</h2>
            <form className="form" onSubmit={formik.handleSubmit}>
                <Input label="First Name" name="first_name" formik={formik}/>
                <Input label="Last Name" name="last_name" formik={formik}/>
                <Input label="Email" name="email" formik={formik}/>
                <Input label="Phone Number" name="phoneNumber" formik={formik}/>
                <Input label="Password" name="password" type="password" formik={formik}/>
                <Input label="National Id" name="national_id" formik={formik}/>

                <div className="buttons">
                    <button className="btn btn--primary" type="submit" disabled={!formik.isValid}>
                    sign up
                    </button>
                </div>
                <div style={{marginTop:"1rem"}}>
                already have an account? <Link to='/login' style={{color:"blue"}}>sign in</Link>
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