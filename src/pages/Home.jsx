import {useState,useEffect,useRef} from 'react';
import SearchBar from '../components/SearchBar';
import BigCard from '../components/BigCard';

function Home() {
  return ( 
    <>
      <div id="body" className="w-full">
        <SearchBar/>
        <div id="newsFeed" className="grid grid-cols-3 gap-4 px-4 max-w-xl mx-auto">
          <BigCard/>
        </div>
      </div>
    </>
  )
}

export default Home
