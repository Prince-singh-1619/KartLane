import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>

      <HorizontalCardProduct category={"airpodes"} heading={"Top airpodes"}/>
      <HorizontalCardProduct category={"watches"} heading={"Popular watches"}/>

      <VerticalCardProduct category={"mobiles"} heading={"Top selling phones"}/>
      <VerticalCardProduct category={"mouse"} heading={"Budget mouse"}/>
      <VerticalCardProduct category={"televisions"} heading={"Colorful TVs"}/>
      <VerticalCardProduct category={"camera"} heading={"Capture your moments"}/>
      <VerticalCardProduct category={"earphones"} heading={"Get vibing"}/>
      <VerticalCardProduct category={"speakers"} heading={"Top selling speakers"}/>
      <VerticalCardProduct category={"refrigerator"} heading={"Store in cool"}/>
      <VerticalCardProduct category={"trimmers"} heading={"Grooming products"}/>
    </div>
  )
}

export default Home