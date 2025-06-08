import React, { useEffect } from "react";
import { useAuthStore } from "../../../store/authStore";
import useStoryStore from "../../../store/storyStore";

import UpdateProfileModal from "../component/UpdateProfileModal";
import { getAllGeneratedStories } from "../../../api/services/storyServices";
import moment from "moment";
import { Link } from "react-router-dom";
import AlertSucces from "../../../globalcomponents/AlertSucces";
import { useUiStore } from "../../../store/UiStore";

const DashboardProfile = () => {
  const user = useAuthStore((state) => state.user);
  const success = useUiStore((state) => state.success);
  const pastStories = useStoryStore((state) => state.pastStories);

  useEffect(() => {
    getAllGeneratedStories();
  }, []);

  console.log(user);

  return (
    <div className="p-5">
      {success ? <AlertSucces /> : ""}
      <h3 className="text-3xl font-semibold">Profile</h3>

      <div className="flex flex-col gap-3 mt-5">
        <div>
          <span className="font-bold text-lg">Your child Name</span>
          <p>{user?.name}</p>
        </div>

        <div>
          <span className="font-bold text-lg">Your Email</span>
          <p>{user?.email}</p>
        </div>

         <div>
                        <Link className='underline text-sm' to='/forgotpassword'>
                          forgot password
                        </Link>
                      </div>
      </div>

      <div className="mt-5">
        <UpdateProfileModal />
      </div>

      <div className="mt-5">
        <div>
          <span className="font-bold text-lg">Past Stories Generated</span>
        </div>

        <div className="flex flex-col gap-3">
          {pastStories.map((story, index) => {
            const formattedDate = moment(story.createdAt)
              .local()
              .format("MMMM Do YYYY, h:mm:ss A");
            return (
              <div
                className="border p-5 flex gap-2 justify-between rounded-lg"
                key={index}
              >
                <div>
                  <span className="uppercase font-semibold">
                    {story.prompt}
                  </span>
                  <p className="text-sm italic">{formattedDate}</p>
                </div>
                {/* <button className='btn btn-info'>
                                    <p>See more</p>
                                </button> */}
                <Link
                  to={`/dashboard/${story._id}`}
                  className="w-16 flex items-center justify-center group-hover:scale-105 transition-transform duration-200 bg-gradient-to-br from-pink-200 to-purple-200 rounded-lg"
                >
                  <div className="w-16  flex items-center justify-center group-hover:scale-105 transition-transform duration-200 bg-gradient-to-br from-pink-200 to-purple-200 rounded-lg">
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
                        d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                      />
                    </svg>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DashboardProfile;
