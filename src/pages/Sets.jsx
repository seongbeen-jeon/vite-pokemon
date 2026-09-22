import {useEffect, useState} from "react";
import BoxTitle from "../components/BoxTitle";
import {getBoxes} from "../services/boxService.js";
import BoxesBlock from "../components/BoxesBlock.jsx";

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
        <div id="body" className="w-[90%] pb-20 mx-auto">
            <div className="container flex flex-col items-center">
                <BoxesBlock series={"메가 진화"} boxes={megaSeries} />
                <BoxesBlock series={"스칼렛&바이올렛"} boxes={svSeries} />
                <BoxesBlock series={"소드&실드"} boxes={ssSeries} />
            </div>
        </div>
        </>
    );
}

export default Sets;