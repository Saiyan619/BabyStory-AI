import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getStoryById } from '../../../api/services/storyServices';

const AudioPlayer = ({ src }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const duration = audioRef.current.duration;
    const currentTime = audioRef.current.currentTime;
    setProgress((currentTime / duration) * 100);
  };

  useEffect(() => {
    const audio = audioRef.current;
    audio.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-3 flex flex-col gap-2">
      <audio
        ref={audioRef}
        className="hidden"
        src={src}
        type="audio/mpeg"
        onEnded={() => setIsPlaying(false)}
      >
        Your browser does not support the audio element.
      </audio>
      <div className="flex items-center gap-3">
        <button
          onClick={togglePlayPause}
          className="p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200"
        >
          {isPlaying ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5 3l14 9-14 9V3z" />
            </svg>
          )}
        </button>
        <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-600 transition-all duration-200"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      <div className="text-xs text-gray-500 font-medium text-center">
        {isPlaying ? 'Playing' : 'Paused'}
      </div>
    </div>
  );
};

const StoryPage = () => {
  const { id } = useParams();
  const [storyDetails, setStoryDetails] = useState({});

  useEffect(() => {
    getSingleStory();
  }, [id]);

  const getSingleStory = async () => {
    try {
      const res = await getStoryById(id);
      setStoryDetails(res);
    } catch (error) {
      console.log(error);
    }
  };

  const cleanedTitle = storyDetails.title?.replace(/\*/g, '');

  return (
    <div className="min-h-screen p-6 md:p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 via-purple-700 to-blue-500 bg-clip-text text-transparent">
            {cleanedTitle || 'Loading Story...'}
          </h1>
          <button
            onClick={getSingleStory}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200"
          >
            Refresh Story
          </button>
        </div>

        {/* Audio Player */}
        {storyDetails.audioUrl && (
          <div className="mb-6">
            <AudioPlayer src={storyDetails.audioUrl} />
          </div>
        )}

        {/* Metadata */}
        {storyDetails.createdAt && (
          <div className="text-sm text-gray-500 mb-4">
            Created: {new Date(storyDetails.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
        )}

        {/* Story Content */}
        <div className="prose prose-lg max-w-none text-gray-800">
          {storyDetails.text ? (
            storyDetails.text.split(/\n\s*\n/).map((para, index) => (
              <p key={index} className="mb-4 leading-relaxed">
                {para}
              </p>
            ))
          ) : (
            <p className="text-gray-500 italic">No story content available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryPage;