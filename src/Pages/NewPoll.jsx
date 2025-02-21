import React from 'react'
import Poll from '../Components/Poll'

function NewPoll() {
  return (
    <div>
      <h1 className='text-5xl px-auto mix-blend-multiply text-transparent  bg-clip-text bg-gradient-to-r from-blue-700 to-violet-600 w-fit px-3 py-1 mx-auto mt-12 '>Let's Create a new poll to get Other's Opinion</h1>
      <Poll/>
    </div>
  )
}

export default NewPoll
