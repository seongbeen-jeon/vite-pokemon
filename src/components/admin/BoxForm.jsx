import {useState} from "react";
import {supabase} from "../../lib/supabase";


const API_URL = import.meta.env.VITE_SUPABASE_URL;
const {data : {session}} = await supabase.auth.getSession();

export default function BoxForm(){
    const [imageUrl, setImageUrl] = useState("");

    const handleSubmit = async (e)=>{
        e.preventDefault();

        const formdata = new FormData(e.currentTarget);
        const data = Object.fromEntries(formdata);

        const response = await fetch(`http://localhost:3000/api/admin/insertBox`,{ // test용 로컬 api 서버 주소
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                Authorization : `Bearer ${session.access_token}`,
            },
            body : JSON.stringify(data),
        });

        console.log(response);
    }

    return(
    <>
    <div id="container" className="w-full">
        <form onSubmit={handleSubmit}>
            <div>
                <div>
                    박스 이름
                </div>
                <div>
                    <input type="text" name="title"></input>
                </div>
            </div>
                
            <div>
                <div>
                    박스 코드
                </div>
                <div>
                    <input type="text" name="set_code"></input>
                </div>
            </div>
            <div>
                <div>
                    카테고리
                </div>
                <div>
                    <input type="text" name="category"></input>
                </div>
            </div>
            <div>
                <div>
                    출시 날짜
                </div>
                <div>
                    <input type="date" name="releaseDate"></input>
                </div>
            </div>
            <div>
                <div>
                    한 팩당 가격
                </div>
                <div>
                    <input type="number" name="pack_price"></input>
                </div>
            </div>
            <div>
                <div>
                    박스 가격
                </div>
                <div>
                    <input type="number" name="box_price"></input>
                </div>
            </div>
            <div>
                <div>
                    저레어 장수
                </div>
                <div>
                    <input type="number" name="official_cards"></input>
                </div>
            </div>
            <div>
                <div>
                    전체 장 수
                </div>
                <div>
                    <input type="number" name="total_cards"></input>
                </div>
            </div>
            <div>
                <div>
                    박스 구성
                </div>
                <div>
                    <input type="text" name="composition"></input>
                </div>
            </div>
            <div>
                <div>
                    박스 이미지 주소
                </div>
                <div>
                    <input type="url" name="image_path" onChange={(e)=>setImageUrl(e.target.value)}></input>
                </div>
                <div>
                    박스 이미지 미리보기
                    {imageUrl && (
                        <img src={imageUrl} className="w-[20rem]" alt="박스 이미지 미리보기"></img>
                    )}
                </div>
            </div>

            <button type="submit">등록</button>
        </form>
    </div>
    </>
    );
}