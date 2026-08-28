import {useEffect, useState} from "react";
import BoxTitle from "../components/BoxTitle";
import {getBoxes} from "../services/boxService.js";


function Sets(){
    const [boxesData, setBoxesData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function fetchBoxes(){
            try{
                const data = await getBoxes();
                
                setBoxesData(data);
            }
            catch(error){
                console.error("Error fetching boxes:", error);
            }
            finally{
                setLoading(false);
            }
        }
        fetchBoxes();

    },[]);

    const megaSeries = boxesData.filter(box => box.name.startsWith("MEGA"));
    const svSeries = boxesData.filter(box => box.name.startsWith("스칼렛"));
    const ssSeries = boxesData.filter(box => box.name.startsWith("소드"));

    if(loading){
        return <div>Loading...</div>;
    }

    return(
        <>
        <div id="body" className="w-full pb-20">
            <div className="container flex flex-col items-center">
                <div className="series-title text-xl text-gray-500 text-center font-bold mt-10">
                    메가 진화
                </div>
                <div className="boxesBlock grid grid-cols-3 gap-20 mt-5">
                    {megaSeries.map((box) => (
                        <BoxTitle key={box.id} box={box} />
                    ))}
                </div>

                <div className="series-title text-xl text-gray-500 text-center font-bold mt-20">
                    스칼렛&바이올렛
                </div>
                <div className="boxesBlock grid grid-cols-3 gap-20 mt-5">
                    {svSeries.map((box) => (
                        <BoxTitle key={box.id} box={box} />
                    ))}
                </div>

                <div className="series-title text-xl text-gray-500 text-center font-bold mt-20">
                    소드&실드
                </div>
                <div className="boxesBlock grid grid-cols-3 gap-20 mt-5">
                    {ssSeries.map((box) => (
                        <BoxTitle key={box.id} box={box} />
                    ))}
                </div>

            </div>
        </div>
        </>
    );
}

export default Sets;