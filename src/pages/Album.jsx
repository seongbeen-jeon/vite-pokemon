import MediumCard from '../components/MediumCard';

function Album(){
        return(
        <>
        <div id="body" className="w-full">
            <div id="option_bar" className="m-[10vh] flex justify-between items-center">
                <div id="sort" className="">
                    <select className="w-25 bg-white shadow-sm p-1.5">
                        <option value="number">번호순</option>
                        <option value="name">이름순</option>
                    </select>
                </div>
                <div id="filter" className="">
                    <select className="w-25 bg-white shadow-sm p-1.5">
                        <option value="all">전체</option>
                        <option value="fire">불꽃</option>
                        <option value="water">물</option>
                        <option value="grass">풀</option>
                    </select>
                </div>
            </div>

            <div id="dex" className="m-[10vh] grid grid-cols-6 gap-3 ">
                <MediumCard/>
                <MediumCard/>
                <MediumCard/>
                <MediumCard/>
                <MediumCard/>
                <MediumCard/>
                <MediumCard/>
            </div>
        </div> 
        </>
        );
}

export default Album;