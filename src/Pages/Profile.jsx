import React from 'react'
import {useUser  } from "../Api/Context";


function Profile() {
    const {loginData}=useUser();
  return (
    <div>
      Welcome to Your Profile
      <h2>Name</h2>
      <h2 className='bg-amber-50 text-red font-bold text-black'>{loginData.first_name} {loginData.last_name}</h2>
      <h3>Email</h3>
      <h3 className="bg-amber-50 text-red font-bold text-black">{loginData.email}</h3>
    </div>
  )
}

export default Profile
