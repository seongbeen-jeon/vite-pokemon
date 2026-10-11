import {useRef, useState} from "react";

import {useAuth} from "../../contexts/authContext.jsx";

export default function DragandDrop({apiUrl}) {
    const {session} = useAuth();
    const fileInputRef = useRef(null);
    const [fileName, setFileName] = useState("");

    {/* API 요청 */}
    const handleSubmit = async(e)=>{
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const response = await fetch(apiUrl,{
            method : "POST",
            headers : {
                Authorization : `Bearer ${session.access_token}`,
            },
            body : formData,
        });

        console.log("response : ", response);
        if(response.ok){
            alert("업로드가 성공적으로 완료되었습니다.");
        }
    }

    {/* Drag and Drop 영역 */}
    const handleZoneClick = ()=>{ // cilck 이벤트 발생 시 inpur file에 이벤트 위임
        fileInputRef.current.click();
    };

    const handleDragOver = (e)=>{ // 드래그 오버 기본 파일열기 차단
        e.preventDefault();
    }

    const handleDrop = (e)=>{ // 드랍된 파일을 input file에 전달
        e.preventDefault();

        const files = e.dataTransfer.files;
        if(files){
            fileInputRef.current.files = files;
            setFileName(Array.from(files).map(file => file.name).join(", "));
        }
    }

    {/* File Input */}
    const handleFileChange = (e)=>{
        const files = e.target.files;
        if(files){
            setFileName(Array.from(files).map(file => file.name).join(", "));
        }
    };

    return(
        <>
        <div id="container" className="w-full m-5">
            <form onSubmit={handleSubmit}>
                {/* 드래그 앤 드롭 영역 */}
                <div
                    onClick={handleZoneClick}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className="w-[20rem] h-[10rem] border-2 border-dashed border-gray-400 flex items-center justify-center cursor-pointer"
                >
                    {fileName ? (
                        <div className="text-md font-semibold text-gray-700">{fileName}</div>
                    ):(

                        <div className="text-md font-semibold text-gray-700">파일을 여기에 드래그 하거나 클릭 하세요.</div>)}

                </div>

                {/* 실제 input*/}
                <input type="file" name="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" multiple/>
                
                <button type="submit" className="mt-5 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">업로드</button>
            </form>
        </div>
        </>
    );
}