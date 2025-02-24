import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'

const HorizontalCardProduct = ({category, heading}) => {
    const [data, setData] = useState([]) 
    const [loading, setLoading] = useState(false)
    const loadingList = new Array(12).fill(null)

    const [scroll, setScroll] = useState(0)
    const scrollElement = useRef()

    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async(e,id)=>{
       await addToCart(e,id)
       fetchUserAddToCart()
    }

    const fetchData = async() =>{
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setLoading(false)

        // console.log("Horizontal data", categoryProduct)
        setData(categoryProduct?.data)
    }
    useEffect(()=>{
        fetchData()
    }, [])

    const scrollLeft = () =>{
        scrollElement.current.scrollLeft -= 250
    }
    const scrollRight = () =>{
        scrollElement.current.scrollLeft += 250
    }

  return (
    <div className='container mx-auto px-4 my-6 relative'>
        <h2 className='text-2xl font-semibold py-4'>{heading}</h2>

        <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none ' ref={scrollElement}>
            <button onClick={scrollLeft} className='bg-slate-100 shadow-md rounded-full p-1 absolute left-0 z-10 text-lg hidden md:block hover:border border-black'> <FaAngleLeft/> </button>
            <button onClick={scrollRight} className='bg-slate-100 shadow-md rounded-full p-1 absolute right-0 z-10 text-lg hidden md:block hover:border border-black transition-all duration-700'> <FaAngleRight/> </button>
            
            {
                loading ? (
                    loadingList.map((product,index)=>{
                        return(
                            <div key={index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'>
                                <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse'>
    
                                </div>
                                <div className='p-4 grid w-full gap-2'>
                                    <p className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse p-1 rounded'></p>
                                    <p className='capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded'></p>
                                    <div className='flex gap-3 w-full'>
                                        <p className='text-red-600 font-medium p-1 bg-slate-200 w-full animate-pulse rounded'></p>
                                        <p className='text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse rounded'></p>
                                    </div>
                                    <div className='text-sm  text-white px-3 py-0.5 rounded-full w-full bg-slate-200 animate-pulse'></div>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    data.map((product, index) =>{
                        return(
                            <Link to={"product/"+product?._id} key={index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'>
                                <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]'>
                                    <img src={product.productImage[0]} alt='' className='object-scale-down h-full hover:scale-110 transition-all'/>
                                </div>
                                <div className='p-4 grid'>
                                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black capitalize'>{product?.productName}</h2>
                                    <p className='capitalize text-slate-500'>{product?.category}</p>
                                    <div className='flex gap-3'>
                                        <p className='text-red-600 font-medium'>{displayINRCurrency(product?.sellingPrice)}</p>
                                        <p className='text-slate-500 line-through'>{displayINRCurrency(product?.price)}</p>
                                    </div>
                                    <button className='bg-red-600 hover:bg-red-700 transition-all text-white px-3 py-1 rounded-full' onClick={(e)=>handleAddToCart(e, product?._id)}>Add to Cart</button>
                                </div>  
                            </Link>
                        )
                    })
                )
            }
            
        </div>
        

        
    </div>
  )
}

export default HorizontalCardProduct