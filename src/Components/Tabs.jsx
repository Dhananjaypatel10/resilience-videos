import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setActiveTabs } from '../app/features/searchSlice';

const Tabs = () => {
  const tabs = ['photos','videos'];

   const dispatch= useDispatch();

    const activeTabs = useSelector((state) => state.search.activeTabs);

  return (
    <div>
      <div style ={{
         display :"flex",
          gap: "10px",
         padding: "15px"
      }}>
        {tabs.map((ele) =>
        {
           return <button onClick={() => dispatch(setActiveTabs(ele))}
           style ={{
              margin: "5px",
              fontSize: "18px",
              background: activeTabs === ele ? "blue" : "#222",
              color: "white",
              padding: "10px",
              border: "none",
              cursor: "pointer",
              borderRadius: "5px"
           }}>
            {ele}</button>
        })}
      </div>
    </div>
  )
}

export default Tabs