import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import Banner from './Banner';
import mensBanner from "../assets/mensbanner.jpg"
import womensBanner from "../assets/womensbanner.jpg"
import kidsBanner from "../assets/kidsbanner.jpg"

const BannerCarousel = () => {
  return (
    <Carousel autoPlay interval={3000}  stopOnHover={false} infiniteLoop showStatus={false}>
        <Banner image={womensBanner} primaryColor={"#e9587c"} secondaryColor={"#e32b58"} lightbg={"#fbdfe6"} text1={"Great Deals in this festive season"} text2={"On Womens Traditional wear"} />
        <Banner image={mensBanner} primaryColor={"#4d6850"} secondaryColor={"#3d523f"} lightbg={"#e0f0e2"} text1={"40 - 50% Off This Diwali"} text2={"On Mens Ethnic wear"}/>
        <Banner image={kidsBanner} primaryColor={"#e9587c"} secondaryColor={"#e32b58"} lightbg={"#fbdfe6"} text1={"Exclusive Offers for Diwali"} text2={"50% Discount on kids wear"} />
        
    </Carousel>
  )
}

export default BannerCarousel
