import Navbar from '@/components/Navbar'
import UpdateUserInfo from '@/components/users/UpdateUserInfo'
import React from 'react'

function User() {
  return (
    <div >
      <Navbar />
      <div className="md:ml-[119px] xl:ml-[336px] max-md:py-[40px] md:pb-[40px]">
        <UpdateUserInfo />
        
      </div>
    </div>
  )
}

export default User