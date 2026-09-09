import logo from '../../assets/search.png';

function SearchBar({value, onChange, onSearch}){
    
    const handleKeyDown = (e)=>{
        if(e.key ==="Enter"){
            onSearch();
        }
    }

    return(
        <div className="m-[15vh] flex justify-center">
            <div id="searchbar" className="bg-white rounded-3xl shadow-sm flex justify-between items-center gap-1 p-1 w-1/2 h-12 px-3">

                <input 
                    type="text" 
                    className="w-full focus:outline-none p-2" 
                    placeholder="카드 검색"
                    value={value}
                    onKeyDown={handleKeyDown}
                    onChange={onChange}
                />

                <div className="w-8 cursor-pointer" onClick={onSearch}>
                    <img className="" src={logo}/>
                </div>
            </div>
        </div>
    );
}

export default SearchBar;