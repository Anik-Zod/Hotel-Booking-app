import Header from '../components/Header'
import Navbar from '../components/Navbar'
import Featured from '../components/Featured'
import FeaturedProperties from '../components/FeaturedProperties'
import PropertyList from '../components/PropertyList'

export default function Home() {
  return (
    <>
      <Navbar/>
      <Header/>
      <Featured/>
      <PropertyList/>
      <FeaturedProperties/>
    </>
  )
}
