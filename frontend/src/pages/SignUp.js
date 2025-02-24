import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/signin.gif'
import imageTobase64 from '../helpers/imageTobase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        profilePic: "",
    })
    const navigate = useNavigate();

    const handleUploadPic = async(e) =>{
        const file = e.target.files[0];
        const imagePic = await imageTobase64(file)
        // console.log("imagePic", imagePic)

        setData((prev) =>{
            return{
                ...prev,
                profilePic : imagePic
            }
        })
    }

    const handleOnChange = (e) =>{
        const {name, value} = e.target

        setData((prev)=>{
            return {
                ...prev,
                [name]: value
            }
        })
    }
    
    const handleSubmit = async(e) =>{
        e.preventDefault();

        if(data.password === data.confirmPassword){
            const dataResponse = await fetch(SummaryApi.signUp.url, {
                method: SummaryApi.signUp.method,
                headers :{
                    "content-type" : "application/json",
                },
                body : JSON.stringify(data)
            })
            const dataApi = await dataResponse.json()
            // console.log("data", dataApi)
            if(dataApi.success){
                toast.success(dataApi.message)
                navigate("/login")
            }
            if(dataApi.error){
                toast.error(dataApi.message)
            }
            // toast(dataApi.message) 
        }
        else{
            toast.error("Please check password and confirm password")
        }

        
    }
    // console.log("Data login", data)


  return (
    <section id='Signup' className='mt-2'>
        <div>

            <div className='bg-white p-4 w-full max-w-sm mx-auto'>
                <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                    <div> <img src={data.profilePic || logo} alt='signIn'/> </div>
                    <form>
                        <label>
                            <div className='text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full'>
                            Upload Photo
                            </div>
                            <input type='file' className='hidden' onChange={handleUploadPic}/>
                        </label>
                        
                    </form>
                    
                </div>

                <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                    <div className='grid'>
                        <label>Name: </label>
                        <div className='bg-slate-100 p-2'>
                            <input 
                                type='name' 
                                placeholder='Enter your name' 
                                name='name'
                                value={data.name}
                                onChange={handleOnChange}
                                required
                                className='w-full h-full outline-none bg-transparent'/>
                        </div>
                    </div>

                    <div className='grid'>
                        <label>Email: </label>
                        <div className='bg-slate-100 p-2'>
                            <input 
                                type='email' 
                                placeholder='Enter your email' 
                                name='email'
                                value={data.email}
                                onChange={handleOnChange}
                                required
                                className='w-full h-full outline-none bg-transparent'/>
                        </div>
                    </div>

                    <div>
                        <label>Password: </label>
                        <div className='bg-slate-100 p-2 flex'>
                            <input 
                                type={showPassword ? "text":"password"} 
                                placeholder='Enter password' 
                                name='password'
                                value={data.password}
                                onChange={handleOnChange}
                                required
                                className='w-full h-full outline-none bg-transparent'/>
                            <div className='cursor-pointer text-xl' onClick={()=> setShowPassword((prev) => !prev)}>
                                <span>
                                    {showPassword ? (<FaEyeSlash/>) : (<FaEye/>)}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label>Confirm password: </label>
                        <div className='bg-slate-100 p-2 flex'>
                            <input 
                                type={showConfirmPassword ? "text":"password"} 
                                placeholder='Enter password again' 
                                name='confirmPassword'
                                value={data.confirmPassword}
                                onChange={handleOnChange}
                                required
                                className='w-full h-full outline-none bg-transparent'/>
                            <div className='cursor-pointer text-xl' onClick={()=> setShowConfirmPassword((prev) => !prev)}>
                                <span>
                                    {showConfirmPassword ? (<FaEyeSlash/>) : (<FaEye/>)}
                                </span>
                            </div>
                        </div>
                    </div>

                    <button className='bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:bg-red-700 mx-auto block mt-6'>Sign In</button>
                </form>

                <p className='my-5'>Already have an account? <Link to={"/login"} className='text-red-500 hover:text-red-700 hover:underline'>Login</Link></p>
            </div>
        </div>
    </section>
  )
}

export default SignUp