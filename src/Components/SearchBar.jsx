import React, { useState } from 'react'
import {useDispatch} from "react-redux";
import { setQuery } from '../app/features/searchSlice';
const SearchBar = () => {
   const[text,setText] = useState("");

   const dispatch=useDispatch();

   const handleSubmit= (e) => 
   {
      e.preventDefault();
      console.log("Search Items :",text)
      dispatch(setQuery(text))

      setText("")
   }
  return (
    <div  >
      <div >
        <form onSubmit={handleSubmit}
         style ={{
            padding:"10px 20px",
         }}> 
          <input
           required 
           type = "text"
          value={text}
          placeholder ="Search anything....."
           onChange={(e) => setText(e.target.value)}
            style={{
              padding:"15px 20px",
              background:"#fff",
              border : "1px solid black",
              borderRadius:"8px"
            }}/>
          <button type="submit"
            style={{
               margin:"10px",
               padding:"10px 15px",
               border:"none",
               background:"#111",
               color:"white",
               borderRadius:"8px"

            }}>Search</button>
        </form>
        
      </div>
    </div>
  )
}

export default SearchBar