import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div
      className="hero h-[80vh] rounded-2xl"
      style={{
        backgroundImage: "url('/animated-children-reading-book-together-happy-kids-learning-and-enjoying-story-time-vector.jpg')",
      }}>
  <div className="hero-overlay h-[80vh] bg-opacity-60 rounded-2xl"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">Create Magical Stories, Made Just for Your Little One</h1>
      <p className="mb-5">
        BabyStory is an AI powered App that helps children create personalized stories, fostering creativity and love for reading.
          </p>
          <Link to="/signup">
          <button className="btn btn-primary">Get Started</button>
          </Link>
    </div>
  </div>
</div>
  )
}

export default Header
