import React from 'react'
import Navbar from '../../globalcomponents/Navbar'
import Header from './components/Header'
import Features from './components/Features'
import Pricing from './components/Pricing'
import About from './components/About'

const Home = () => {
  return (
      <div>
          <Navbar />
          <div className='p-6 '>
        <Header />
        <Features />
        <Pricing />
        <About />
      </div>
      
    </div>
  )
}

export default Home
