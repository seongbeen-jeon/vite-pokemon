import {useState} from 'react';
import {Link} from 'react-router-dom';

import SearchBar from '../components/SearchBar';
import {getCards} from '../services/cardService';

// 카드 기본 검색 담당
// 하단에 뉴스피드 혹은 인기 카드 배치

export default function Home() {
  const [keyword, setKeyword] = useState();
  const [cards, setCards] = useState();

  const onChange = (e) => {
    setKeyword(e.target.value);
  };

  const onSearch = async () => {
    if(keyword.includes('/')){// 코드로 검색할 때
      const [set_code, cardTitle] = keyword.split('/');
      const data = await getCards({set_code, keyword : cardTitle});

      setCards(data);

    } else{ // 카드 이름으로 검색할 때
      const data = await getCards({keyword});

      setCards(data);
    }
    setKeyword(""); // 검색 완료시 검색창 초기화
  }

  return ( 
    <>
    <div id="container" className="w-full mx-auto">
        <div className="mt-20 w-[70%] mx-auto">
            <SearchBar value={keyword} onChange={onChange} onSearch={onSearch}/>
        </div>
        <div id="cards container" className="grid grid-cols-6 gap-4">
            {cards && cards.map((card) => (
                <Link to={`/cards/${card.id}`} key={card.id}>
                    <img
                        key={card.id}
                        src={card.image_path}
                        alt={card.name}
                        className="w-full"
                    />
                </Link>
            ))}
        </div>
        <div id="newsFeed" className="grid grid-cols-3 gap-4 px-4 max-w-xl mx-auto">
        </div>
    </div>
    </>
  )
}
