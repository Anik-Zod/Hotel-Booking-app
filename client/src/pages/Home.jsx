import Header from '../components/Header'
import Navbar from '../components/Navbar'
import Featured from '../components/Featured'
import FeaturedProperties from '../components/FeaturedProperties'
import PropertyList from '../components/PropertyList'
import FooterBanner from '../components/FooterBanner'
import Partners from '../components/Partners'
import CardFan from '../components/CardFan'

export default function Home() {
  return (
    <>
      <Navbar/>
      <Header/>
      <CardFan/>
      <Featured/>
      {/* <PropertyList/> */}
      <div className='hidden md:block'>
         <FeaturedProperties/>
        </div>
      <Partners/>
      <FooterBanner/>
    </>
  )
}
