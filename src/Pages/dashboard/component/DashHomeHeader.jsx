import React from 'react'

const DashHomeHeader = () => {
  return (
    <div
    className="hero h-[50vh] rounded-xl"
    style={{
      backgroundImage:
        "url(/adventure-time-1718205825928.jpg)",
    }}
  >
    <div className="hero-overlay h-[50vh] rounded-xl"></div>
    <div className="hero-content text-neutral-content text-center">
      <div className="max-w-md">
    <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-600 via-purple-200 to-blue-500 bg-clip-text text-transparent mb-4">
         BabyStory AI 
          </h1>       
          <p>Create enchanting bedtime stories with the power of AI</p>
      </div>
      </div>
  </div>
  )
}

export default DashHomeHeader
