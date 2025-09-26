import Header from '../components/Header'
import Navbar from '../components/Navbar'
import Featured from '../components/Featured'
import FeaturedProperties from '../components/FeaturedProperties'
import PropertyList from '../components/PropertyList'
import FooterBanner from '../components/FooterBanner'
import Partners from '../components/Partners'
import CardFan from '../components/CardFan'
import Testimonial from '../components/Testimonial'
import { Pricing } from '../components/Pricing'
import { LastFooter } from '../components/LastFooter'

export default function Home() {
  return (
    <>
      <Navbar/>
      <Header/>
      <CardFan/>
      <Featured/>
      <PropertyList/>
      <div className='hidden md:block'>
         <FeaturedProperties/>
        </div>
      <Testimonial/>
      <Pricing/>
      <Partners/>
      <FooterBanner/>
      <LastFooter/>
    </>
  )
}
