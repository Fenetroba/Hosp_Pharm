import React from 'react'
import { Search } from "lucide-react"
const Search_user = () => {
  return (
    <div>
     <div className="p-2 flex items-center space-x-1.5">
            <input
              type="text"
              className="bg-white border-0 outline-0 shadow-2xl rounded-2xl "
            />
            <Search className=" text-white w-10 h-10 rounded-2xl" />
          </div>
    </div>
  )
}

export default Search_user