import Header from '../components/Header'
import Navbar from '../components/Navbar'
import Featured from '../components/Featured'

import PropertyList from '../components/PropertyList'
import FooterBanner from '../components/FooterBanner'
import Partners from '../components/Partners'
import Testimonial from '../components/Testimonial'
import { Pricing } from '../components/Pricing'


export default function Home() {
  return (
    <>
      <Navbar/>
      <Header/>
    
      <Partners/>
      <PropertyList/>
      <Testimonial/>
      <Featured/>
      <Pricing/>
      <FooterBanner/>
    </>
  )
}
