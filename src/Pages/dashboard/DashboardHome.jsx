import React, { useState } from "react";
import axios from "axios";
import DashHomeHeader from "./component/DashHomeHeader";
import {
  generateAiStory,
  getAllGeneratedStories,
} from "../../api/services/storyServices";
import { useAuthStore } from "../../store/authStore";
import CreatedStory from "./component/CreatedStory";
import Skeleton from "./component/Skeleton";

const DashboardHome = () => {
  const [prompt, setPrompt] = useState("");
  const [story, setStory] = useState(null);
  const [skeleton, setSkeleton] = useState(false)
  // const user = useAuthStore((state)=>state.user)

  function handlePromptInput(e) {
    setPrompt(e.target.value);
    console.log(e.target.value);
  }

  const generateStory = async () => {
    setSkeleton(true)
    try {
      const result = await generateAiStory(prompt);
      console.log("Generated story:", result);
      setStory(result);
      setSkeleton(false)
    } catch (err) {
      setSkeleton(false)
      console.error("Failed to generate story:", err);
    }
  };

  console.log(story);

  // const getAllStories = async () => {
  //    getAllGeneratedStories()
  // }
  const suggestedStoryChips = [
    { name: "The Brave Knight and the Princess" },
    { name: "Whispers in the Haunted Library" },
    { name: "Journey to the Sky Islands" },
  ];
  return (
    <div>
      <div className="">
        <DashHomeHeader />
        <div className="mt-5 flex items-center justify-center flex-col gap-3">
          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
</svg>

            <span className="font-semibold">Create your favourite story Here</span>
          </div>
          <input
            onChange={handlePromptInput}
            value={prompt}
            className="input w-1/2 "
            type="text"
            placeholder="What kind of story do you wanna hear?"
          />

          <button onClick={generateStory} className="btn bg-gradient-to-r from-blue-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
              />
            </svg>
            Tell Me Story
          </button>
        </div>

        <div className=" flex items-center flex-col mt-3">
          <span className="font-semibold">Stories you might like</span>
          <div className="flex items-center justify-center gap-3 mt-5 flex-wrap">
            {suggestedStoryChips.map((chip, index) => {
              return (
                <div key={index} className="bg-blue-200 p-2 text-sm rounded-full">
                  {chip.name}
                </div>
              );
            })}
          </div>
        </div>
      </div>

{skeleton ? (
  <Skeleton />
) : story ? (
  <CreatedStory story={story} />
) : null}
      {/* // {story ? <CreatedStory story={story} /> : ""} */}
    </div>
  );
};

export default DashboardHome;
