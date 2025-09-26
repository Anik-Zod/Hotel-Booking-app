import React from 'react'

function SectionHeader({title,description,button}) {
  return (
    <div>
        <div className='container'>
            <div>
                 <p className='w-max mx-auto ring-1 my-8 rounded-xl py-2 px-4'>{button}</p>                    
                <h2 className='text-3xl md:text-6xl font-bold text-center mb-4 text-[#1E3A8A]'>{title}</h2>
                <p className='text-center text-2xl text-black/80 mt-10 mb-10 max-w-xl mx-auto '>{description}</p>
            </div>
        </div>
    </div>
  )
}

export default SectionHeader