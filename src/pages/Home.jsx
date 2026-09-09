import {useState, useEffect} from 'react';

import SearchBar from '../components/SearchBar';
import {getCards} from '../services/cardService';

// 카드 기본 검색 담당
// 하단에 뉴스피드 혹은 인기 카드 배치

function Home() {
  

  return ( 
    <>
      <div id="body" className="w-full">
          <SearchBar/>
        <div id="newsFeed" className="grid grid-cols-3 gap-4 px-4 max-w-xl mx-auto">
        </div>
      </div>
    </>
  )
}

export default Home
