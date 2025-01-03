import React from 'react'
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
  return (
    <div className='h-full m-3 overflow-hidden rounded-3xl flex justify-around items-center w-[500px] bg-gray-200'>
        <input className='w-[400px] h-full outline-none focus:outline-none bg-gray-200 placeholder-black' type='text' placeholder='What are you looking for?' />
        <button className='w-10 h-10 rounded-full bg-pink-500 text-white'><SearchIcon /></button>
    </div>
  )
}

export default SearchBar

// className='w-10 h-10 rounded-full bg-pink-500 text-white'