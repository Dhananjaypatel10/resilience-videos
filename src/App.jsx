// import React from 'react'

import { fetchPhotos, fetchVideos } from "./api/mediaApi";
import ResultGrid from "./Components/ResultGrid";
import SearchBar from "./Components/SearchBar";
import Tabs from "./Components/Tabs";

function App() {
   
  return (
    <>
       <SearchBar />
       <Tabs />
       <ResultGrid />
    </>    
  ) 
}

export default App;