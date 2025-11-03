import React from 'react'

function Dashboard() {
  // Get user and token from sessionStorage
  const token = sessionStorage.getItem("token")
  const user = JSON.parse(sessionStorage.getItem("existingUser"))

  return (
    <>
      <div className='container-fluid d-flex justify-content-center align-items-center bg-secondary vh-100'>
        {
          token ?
            <h1>Welcome , {user?.username}</h1>
            :
            <h1>Welcome</h1>

        }
      </div>
    </>
  )
}

export default Dashboard
