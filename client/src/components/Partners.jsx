import { motion } from 'framer-motion'

function Partners() {
  return (
    <div className='flex flex-col items-center gap-10 my-6 w-full  '>
      <h1 className='text-[16px]'>Join 4,000+ companies already growing</h1>
      <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
      viewport={{ once: true }}
      className='grid grid-cols-2 sm:flex  sm:px-5 gap-7'>
        <Company src="bolt.png" name="Boltshift"/>
        <Company src="Logomark (1).png" name="Lightbox"/>
        <Company src="Logomark (2).png" name="FeatherDev"/>
        <Company src="Logomark (3).png" name="Spherule"/>
        <Company src="Logomark (4).png" name="GlobalBank"/>
        <Company src="Logomark (5).png" name="Nietzsche"/>
      </motion.div>
    </div>
  )
}

function Company({src, name}) {
  return(
    <div className='flex gap-2'>
      <img src={src} className='h-[44px] w-[44px]'/>
      <p className='font-bold'>{name}</p>
    </div>
  )
}
export default Partners