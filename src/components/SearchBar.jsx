function SearchBar(){
    //state
    
    //logic


    //view
    return(
        <div className="m-[15vh] flex justify-center">
            <div id="searchbar" className="bg-white rounded-3xl shadow-sm flex justify-between items-center gap-1 p-1 w-1/2 h-12 px-3">
            <input type="text" className="w-full focus:outline-none p-2" placeholder="카드 검색" />
            <a className="w-8" href="#"><img className="" src="../../assets/search_icon.png"></img></a>
        </div>
        </div>
    );
}

export default SearchBar;