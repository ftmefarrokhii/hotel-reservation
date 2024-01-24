import { useNavigate } from "react-router-dom"
import {useFormik} from 'formik'
import * as Yup from 'yup'
import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { authenticateUser, getAsyncUsers } from "../features/AuthSlice"

export default function Login(){
    const navigate = useNavigate()
    const { loading, error, users ,isAuthenticated } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getAsyncUsers())
    },[dispatch])
    
    useEffect(()=>{
        if(isAuthenticated) navigate('/' , {replace: true })
        console.log("isAuthenticated : ",isAuthenticated);
    },[isAuthenticated])

    const initialValues = {
        email : "" , 
        password : "" 
    }
    const validationSchema = Yup.object({
        email : Yup.string().email('invalid email format').required('email is required'),
        password : Yup.string().required('password is required'),
    })

    const onSubmit = (values) => {
        {users.find((user)=> user.email === values.email && user.password === values.password) ?
            dispatch(authenticateUser()) : alert("this account doesnt exist")}
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
            <h2>login</h2>
            <form className="form" onSubmit={formik.handleSubmit}>
                <div className="formControl">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" {...formik.getFieldProps("email")}/>
                    {formik.errors.email && formik.touched.email && <div className='error'>{formik.errors.email}</div>}
                </div>
                <div className="formControl">
                    <label htmlFor="password">password</label>
                    <input type="text" name="password" id="password" {...formik.getFieldProps("password")}/>
                    {formik.errors.password && formik.touched.password && <div className='error'>{formik.errors.password}</div>}
                </div>
                <div className="buttons">
                    <button className="btn btn--primary" type="submit" disabled={!formik.isValid}>login</button>
                </div>
            </form>
        </div>
    )
}
