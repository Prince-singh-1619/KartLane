import React, { useEffect, useState } from 'react'
import SummaryApi from '../common';
import { Link } from 'react-router-dom';

const CategoryList = () => {
    const [categoryProduct, setCategoryProduct] = useState([])
    const [loading, setLoading] = useState(false)

    const categoryLoading = new Array(12).fill(null)

    const fetchCategoryProduct = async() =>{
        setLoading(true)
        const response = await fetch(SummaryApi.categoryProduct.url)
        const dataResponse = await response.json()
        setLoading(false)
        setCategoryProduct(dataResponse.data)
    }

    useEffect(()=>{
        fetchCategoryProduct()
    }, [])

  return (
    <div className='container mx-auto p-4'>
        <div className='flex items-center justify-between overflow-scroll scrollbar-none'>
            {
                loading ? (
                    categoryLoading.map((el, index)=>{
                        return(
                            <div key={'categoryLoading'+index} className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse'>
                            </div>
                        )
                    })
                ) : (
                    categoryProduct.map((product, index)=>{
                        return(
                            <Link to={"/product-category?category="+product?.category} key={product?.category} className='mx-1 cursor-pointer' >
                                <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center'>
                                    <img src={product?.productImage[0]} alt={product?.category} className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all' />
                                </div>
                                <p className='text-center text-sm md:text-base capitalize'>{product?.category}</p>
                            </Link>
                        )
                    })
                )
                
            }
        </div>
    </div>
  )
}

export default CategoryList