import React from 'react'
import Navbar from '../../globalcomponents/Navbar'
import Header from './components/Header'
import Features from './components/Features'
import About from './components/About'

// This is the parent container of my landing page(and its Components)
const Home = () => {
  return (
      <div>
          <Navbar />
          <div className='p-6 '>
        <Header />
        <Features />
        <About />
      </div>
      
    </div>
  )
}

export default Home
