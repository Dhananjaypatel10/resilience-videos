import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setActiveTabs } from '../app/features/searchSlice';

const Tabs = () => {
  const tabs = ['photos','videos'];

   const dispatch= useDispatch();

    const activeTab = useSelector((state) => state.search.activeTab);

  return (
    <div>
      <div style ={{
         display :"flex",
          gap: "10px",
         padding: "15px",
         justifyContent:"center"
      }}>
        {tabs.map((ele) =>
        {
           return <button onClick={() => dispatch(setActiveTabs(ele))}
           style ={{
              margin: "5px",
              fontSize: "18px",
              background: activeTab === ele ? "blue" : "#222",
              color: "white",
              padding: "10px",
              border: "none",
              cursor: "pointer",
              borderRadius: "5px"
           }}>
            {ele.toUpperCase()}</button>
        })}
      </div>
    </div>
  )
}

export default Tabs