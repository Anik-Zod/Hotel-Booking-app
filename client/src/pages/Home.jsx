import Header from '../components/Header'
import Navbar from '../components/Navbar'
import Featured from '../components/Featured'

import PropertyList from '../components/PropertyList'
import FooterBanner from '../components/FooterBanner'
import Partners from '../components/Partners'
import Testimonial from '../components/Testimonial'
import { Offer } from '../components/Offer'



export default function Home() {
  return (
    <>
      <Header/>
      <PropertyList/>
      <Featured/>
      <Offer/>
      <Partners/>
      <Testimonial/>
    </>
  )
}
