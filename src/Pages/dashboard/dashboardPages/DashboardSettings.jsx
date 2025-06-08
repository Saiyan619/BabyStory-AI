import React from 'react'
import Navbar from '../component/Navbar'
import { getSettings } from '../../../api/services/settingServices'
import { useSettingsStore } from '../../../store/settingsStore'
import UpdateSettingsModal from '../component/UpdateSettingsModal'
import Loader from '../component/Loader'
import { useEffect } from 'react'

const DashboardSettings = () => {
  const settings = useSettingsStore((state) => state.settings)
  useEffect(() => {
 getSettings()
  }, [])
  
  

  return (
    <div className='p-5 border'>
      <h3 className='text-3xl font-semibold'>Settings</h3>
      
      {settings ? 
        (<div>
           <div className='flex flex-col gap-3 mt-5'>
         <div>
        <span className='text-lg font-bold'>Your Child Age</span>
        <p>{settings.childAge}</p>
            </div>
            <div>
        <span className='text-lg font-bold'>Story Length</span>
        <p>{settings.storyLength}</p>
      </div>
      
      <div>
        <span className='text-lg font-bold'>Voice Narrator</span>
        <p>{settings.voiceInput ? "Allowed" : "Not Allowed"}</p>
      </div>

      <div>
        <span className='text-lg font-bold'>Illustration</span>
        <p>Coming soon.......</p>
      </div>

     </div>

      <div className='mt-5'>
      <UpdateSettingsModal />
      </div>
 </div>)
        :
        <Loader />
      }
    </div>
  )
}

export default DashboardSettings
