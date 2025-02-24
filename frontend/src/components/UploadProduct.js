import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import productCategory from '../helpers/productCategory';
import { FaUpload } from "react-icons/fa";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import SummaryApi from '../common';
import {toast} from 'react-toastify'

const UploadProduct = ({ onClose, fetchData }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  })
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false)
  const [fullScreenImage, setFullScreenImage] = useState("")

  const handleOnChange = (e) =>{
    const {name, value} = e.target

    setData((prev)=>{
      return{
        ...prev,
        [name]: value
      }
    })
  }

  const handleUploadProduct = async(e) =>{
    const file = e.target.files[0]
    // setUploadProductImageInput(file.name)
    // console.log("file", e)
    const uploadImageCloudinary = await uploadImage(file)

    setData((prev) =>{
      return{
        ...prev,
        productImage: [...prev.productImage, uploadImageCloudinary.url]
      }
    })
    // console.log("uploaded Image", uploadImageCloudinary.url)
  }

  const handleDeleteProductImage = async(index) =>{
    console.log("image index", index)

    const newProductImage = [...data.productImage]
    newProductImage.splice(index, 1)

    setData((prev) =>{
      return{
        ...prev,
        productImage: [...newProductImage]
      }
    })
  }

  // product upload button
  const handleSubmit = async(e) =>{
    e.preventDefault()
    // console.log(data)

    const response = await fetch(SummaryApi.uploadProduct.url, {
      method: SummaryApi.uploadProduct.method,
      credentials: 'include',
      headers: {
        "content-type" : "application/json"
      },
      body: JSON.stringify(data)
    })

    const responseData = await response.json()
    if(responseData.success){
      toast.success(responseData?.message)
      onClose()
      fetchData()
    }
    if(responseData.error){
      toast.error(responseData?.message)
    }

  }

  return (
    <div className='fixed w-full h-full bg-slate-200 bg-opacity-70 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
        <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
          <div className='flex juustify-between items-center pb-3'>
            <h2 className='font-bold text-lg'>Upload Product</h2>
            <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}> 
              <IoMdClose/> 
            </div>
          </div>

          <form className='grid p-4 gap-2 pb-3 overflow-y-scroll h-full' onSubmit={handleSubmit}>
            <label htmlFor='productName'>Product Name: </label>
            <input
              type='text'
              id='productName'
              placeholder='Enter product name'
              value={data.productName}
              name='productName'
              onChange={handleOnChange}
              className='p-2 bg-slate-100 border rounded'
              required
            />

            <label htmlFor='brandName'>Brand Name: </label>
            <input
              type='text'
              id='brandName'
              placeholder='Enter product name'
              value={data.brandName}
              name='brandName'
              onChange={handleOnChange}
              className='p-2 bg-slate-100 border rounded'
              required
            />

            <label htmlFor='category' className='mt-3'>Category: </label>
            <select required value={data.category} name='category' onChange={handleOnChange} className='p-2 bg-slate-100 border rounded'>
              <option value={''}>Select category</option>
              {
                productCategory.map((el, index) =>{
                  return(
                    <option value={el.value} key={el.value+index}>{el.label}</option>
                  )
                })
              }
            </select>

            <label htmlFor='productImage' className='mt-3'>Product Image: </label>
            <label htmlFor='uploadImageInput' className=''>
              <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
                <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                  <span className='text-4xl'><FaUpload/></span>
                  <p className='text-sm'>Upload product image</p>
                  <input type='file' id='uploadImageInput' className='hidden' onChange={handleUploadProduct}/>
                </div>
              </div>
            </label>
            <div>
              {
                data?.productImage[0] ? (
                  <div className='flex items-center gap-2'>
                    {
                      data.productImage.map((el, index)=>{
                        return(
                          <div className='relative group '>
                            <img 
                              src={el} 
                              alt={el} 
                              width={80} 
                              height={80} 
                              className='bg-slate-100 border cursor-pointer' 
                              onClick={()=>{
                                setOpenFullScreenImage(true)
                                setFullScreenImage(el)
                              }}
                            />
                            <div className='absolute -top-2 -right-2 p-1 text-white bg-red-600 rounded-full hidden group-hover:block' onClick={()=>handleDeleteProductImage(index)}>
                              <MdDelete/>
                            </div>
                          </div>
                          
                        )
                      })
                    }
                  </div>
                ) : (
                  <p className='text-red-600 text-xs'>*please upload product image</p>
                )
              }
            </div>

            <label htmlFor='price' className='mt-3 '>Price: </label>
            <input
              type='number'
              id='price'
              placeholder='Enter price'
              value={data.price}
              name='price'
              onChange={handleOnChange}
              className='p-2 bg-slate-100 border rounded'
              required
            />
            <label htmlFor='sellingPrice' className='mt-3 '>Selling price: </label>
            <input
              type='number'
              id='sellingPrice'
              placeholder='Enter selling price'
              value={data.sellingPrice}
              name='sellingPrice'
              onChange={handleOnChange}
              className='p-2 bg-slate-100 border rounded'
              required
            />

            <label htmlFor='description' className='mt-3'>Description: </label>
            <textarea 
              className='h-28 bg-slate-100 border resize-none p-1 ' 
              placeholder='Enter product description ' 
              rows={3} 
              onChange={handleOnChange}
              name='description'
              value={data.description}
            ></textarea>
            
            <button className='w-fit px-36 mx-auto py-2 bg-green-600 text-white mb-10 hover:bg-green-700 rounded-full transition-all font-medium text-lg'>Upload</button>
          </form>
        </div>

        {/* display image in full screen */}
        {
          openFullScreenImage && (
            <DisplayImage onClose={()=>setOpenFullScreenImage(false)} imgUrl={fullScreenImage}/>
          )
        }
    </div>
  )
}

export default UploadProduct