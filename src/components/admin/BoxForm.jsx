import {useState} from "react";
import {useAuth} from "../../contexts/authContext.jsx";

export default function BoxForm(){
    const [imageUrl, setImageUrl] = useState("");
    const {session} = useAuth();

    const handleSubmit = async (e)=>{
        e.preventDefault();

        const formdata = new FormData(e.currentTarget);
        const data = Object.fromEntries(formdata);

        const response = await fetch(`/api/admin/insertBox`,{
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                Authorization : `Bearer ${session.access_token}`,
            },
            body : JSON.stringify(data),
        });

        console.log(response);
        if(response.ok){
            alert("박스 데이터가 성공적으로 등록되었습니다.");
        }
    }

    return(
    <>
    <div id="container" className="w-full m-5">
        <form onSubmit={handleSubmit}>
            <div className="mb-5">
                <div className="mb-2 text-sm text-gray-500 font-bold">
                    박스 이름
                </div>
                <div>
                    <input type="text" name="title" className="w-[15rem] border border-gray-300 rounded-md py-1 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"></input>
                </div>
                <div className="mt-1 text-xs text-gray-500">
                    예) MEGA 확장팩 「인페르노X」
                </div>
            </div>
                
            <div className="mb-5">
                <div className="mb-2 text-sm text-gray-500 font-bold">
                    박스 코드
                </div>
                <div>
                    <input type="text" name="set_code" className="w-[15rem] border border-gray-300 rounded-md py-1 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"></input>
                </div>
                <div className="mt-1 text-xs text-gray-500">
                    예) M2
                </div>
            </div>
            <div className="mb-5">
                <div className="mb-2 text-sm text-gray-500 font-bold">
                    카테고리
                </div>
                <div>
                    <input type="text" name="category" className="w-[15rem] border border-gray-300 rounded-md py-1 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"></input>
                </div>
                <div className="mt-1 text-xs text-gray-500">
                    예) 하이클래스팩 / 강화확장팩 / 확장팩
                </div>
            </div>
            <div className="mb-5">
                <div className="mb-2 text-sm text-gray-500 font-bold">
                    출시 날짜
                </div>
                <div>
                    <input type="date" name="release_date" className="w-[15rem] border border-gray-300 rounded-md py-1 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"></input>
                </div>
                <div className="mt-1 text-xs text-gray-500">
                    예) 2025-11-28
                </div>
            </div>
            <div className="mb-5">
                <div className="mb-2 text-sm text-gray-500 font-bold">
                    한 팩당 가격
                </div>
                <div>
                    <input type="number" name="pack_price" className="w-[15rem] border border-gray-300 rounded-md py-1 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"></input>
                </div>
                <div className="mt-1 text-xs text-gray-500">
                    예) 1000
                </div>
            </div>
            <div className="mb-5">
                <div className="mb-2 text-sm text-gray-500 font-bold">
                    박스 가격
                </div>
                <div>
                    <input type="number" name="box_price" className="w-[15rem] border border-gray-300 rounded-md py-1 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"></input>
                </div>
                <div className="mt-1 text-xs text-gray-500">
                    예) 30000
                </div>
            </div>
            <div className="mb-5">
                <div className="mb-2 text-sm text-gray-500 font-bold">
                    저레어 장수
                </div>
                <div>
                    <input type="number" name="official_cards" className="w-[15rem] border border-gray-300 rounded-md py-1 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"></input>
                </div>
                <div className="mt-1 text-xs text-gray-500">
                    예) 80
                </div>
            </div>
            <div className="mb-5">
                <div className="mb-2 text-sm text-gray-500 font-bold">
                    전체 장 수
                </div>
                <div>
                    <input type="number" name="total_cards" className="w-[15rem] border border-gray-300 rounded-md py-1 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"></input>
                </div>
                <div className="mt-1 text-xs text-gray-500">
                    예) 115
                </div>
            </div>
            <div className="mb-5">
                <div className="mb-2 text-sm text-gray-500 font-bold">
                    박스 구성
                </div>
                <div>
                    <input type="text" name="composition" className="w-[20rem] border border-gray-300 rounded-md py-1 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"></input>
                </div>
                <div className="mt-1 text-xs text-gray-500">
                    예) 1팩 : 5장 / 1상자 : 30팩 (카드 150장)
                </div>
            </div>
            <div>
                <div className="mt-5 mb-2 text-sm text-gray-500 font-bold">
                    박스 이미지 주소
                </div>
                <div>
                    <input type="url" name="image_path" className="w-[20rem] border border-gray-300 rounded-md py-1 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={(e)=>setImageUrl(e.target.value)}></input>
                </div>
                <div className="mt-1 text-xs text-gray-500">
                    예) https://data1.pokemonkorea.co.kr/2025/11/2025-11-05_14-18-14-89295-1762319894.png
                </div>
                <div className="mt-1 text-sm text-gray-500 font-bold">
                    박스 이미지 미리보기
                    {imageUrl ? (
                        <img src={imageUrl} className="mt-1 w-[10rem] h-[15rem] w-auto" alt="박스 이미지 미리보기"></img>
                    ) : <div className="mt-1 h-[15rem] w-[10rem] border border-gray-300"></div>}
                </div>
            </div>

            <button type="submit" className="bg-blue-500 text-white mx-auto py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">등록</button>
        </form>
    </div>
    </>
    );
}