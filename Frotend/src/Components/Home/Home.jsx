import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <Link to='/login'>
      <button className='bg-purple-500 px-3 py-2 rounded-md'>login</button>
      </Link>
    </div>
  )
}

export default Home