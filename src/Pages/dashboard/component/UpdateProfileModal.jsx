import React, { useState } from 'react'
import { updateMe } from '../../../api/services/authService'

const UpdateProfileModal = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const updateMyProfile = async () => {
    let data = {
      name,
      email
    }
    console.log(data)
   try {
     await updateMe(data)
   } catch (error) {
    console.log(error)
   }
  }
console.log(name)
  return (
    <div>
                    {/* Open the modal using document.getElementById('ID').showModal() method */}
<button className="btn btn-accent" onClick={()=>document.getElementById('my_modal_1').showModal()}>Update Profile</button>
<dialog id="my_modal_1" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Update Profile</h3>
          <div>
            <fieldset className="fieldset">
  <legend className="fieldset-legend">Name</legend>
  <input onChange={(e)=>setName(e.target.value)} value={name} type="text" className="input" placeholder="Type here" />
</fieldset> 

            <fieldset className="fieldset">
  <legend className="fieldset-legend">Email</legend>
  <input onChange={(e)=>setEmail(e.target.value)} value={email} type="text" className="input" placeholder="Type here" />
</fieldset>
          </div>
          <div className="modal-action">
                    <button onClick={updateMyProfile} className="btn mr-2 btn-accent">Update</button>

      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn btn-error">Cancel</button>
      </form>
    </div>
  </div>
</dialog>
    </div>
  )
}

export default UpdateProfileModal
