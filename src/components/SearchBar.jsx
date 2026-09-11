import logo from '../../assets/search.png';

function SearchBar({value, onChange, onSearch}){
    
    const handleKeyDown = (e)=>{
        if(e.key ==="Enter"){
            onSearch();
        }
    }

    return(
        <>
        <div id="searchBarContainer" className="w-[70%] mx-auto">

            {/* 검색창 */}
            <div className="w-full mt-5vh flex justify-center">
                <div id="searchbar" className="w-full bg-white rounded-3xl shadow-sm flex justify-between items-center gap-1 p-1 h-12 px-3">
                    <input 
                        type="text" 
                        className="w-full focus:outline-none p-2" 
                        placeholder="카드 검색"
                        value={value}
                        onKeyDown={handleKeyDown}
                        onChange={onChange}
                    />

                    <div id="searchicon" className="w-8 cursor-pointer" onClick={onSearch}>
                        <img className="" src={logo}/>
                    </div>
                </div>
            </div>

            {/* 예시 */}
            <div className="w-full text-xs text-gray-500 mt-2">
                예시) 피카츄 or M2a/234
            </div>
        </div>
        </>
    );
}

export default SearchBar;