import BoxTitle from "../components/BoxTitle";

function Sets(){
    return(
        <>
        <div id="body" className="w-full pb-20">
            <div className="container flex flex-col items-center">
                <div className="series-title text-xl text-gray-500 text-center font-bold mt-10">
                    메가 진화
                </div>
                <div className="boxesBlock grid grid-cols-3 gap-20 mt-5">
                    <BoxTitle/>
                    <BoxTitle/>
                    <BoxTitle/>
                    <BoxTitle/>
                    <BoxTitle/>
                    <BoxTitle/>
                </div>

                <div className="series-title text-xl text-gray-500 text-center font-bold mt-20">
                    스칼렛&바이올렛
                </div>
                <div className="boxesBlock grid grid-cols-3 gap-20 mt-5">
                    <BoxTitle/>
                    <BoxTitle/>
                    <BoxTitle/>
                    <BoxTitle/>
                    <BoxTitle/>
                    <BoxTitle/>
                </div>

                <div className="series-title text-xl text-gray-500 text-center font-bold mt-20">
                    소드&실드
                </div>
                <div className="boxesBlock grid grid-cols-3 gap-20 mt-5">
                    <BoxTitle/>
                    <BoxTitle/>
                    <BoxTitle/>
                    <BoxTitle/>
                    <BoxTitle/>
                    <BoxTitle/>
                </div>

            </div>
        </div>
        </>
    );
}

export default Sets;