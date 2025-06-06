import React from 'react'

const CreatedStory = ({ story }) => {
  if (!story) return null;

  // Clean title and summary (remove asterisks)
  const cleanedTitle = story.title?.replace(/\*/g, '');
  const cleanedSummary = story.summary?.replace(/\*/g, '');

  // Split story text into readable paragraphs
  const paragraphs = story.text
    .split(/(?<=[.!?])\s+/)
    .filter(p => p.trim().length > 0);

  return (
    <div className=' text-slate-800'>
      <div className='flex flex-col gap-4 bg-white rounded-xl p-6 shadow-lg'>
        <h2 className='text-3xl font-bold text-center text-purple-800'>
          {cleanedTitle}
        </h2>

        <p className='text-lg italic text-center text-purple-600'>
          "{cleanedSummary}"
        </p>

        <div className='mt-4 flex flex-col gap-3 text-base leading-relaxed'>
          {paragraphs.map((para, idx) => (
            <p key={idx} className='text-gray-700'>
              {para}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreatedStory;
