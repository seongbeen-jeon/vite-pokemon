import {useAuth} from "../../contexts/authContext.jsx";

export default function CardImageForm(){
    const {session} = useAuth();

    const handleSubmit = async (e)=>{
        e.preventDefault();

        const files = Array.from(e.currentTarget.images.files); //FileList를 배열로 변환
        const chunkSize = 20; //한 번에 업로드할 파일 수
    
        for(let i = 0 ; i < files.length ; i+=chunkSize){
            const chunk = files.slice(i, i + chunkSize);
            const formData = new FormData();

            chunk.forEach((file)=>
                formData.append("images", file));

            const response = await fetch("/api/admin/uploadCardImages",{
                method : "POST",
                headers : {
                    Authorization : `Bearer ${session.access_token}`
                },
                body : formData,
            });

            if(!response.ok){
                throw new Error(`${i}번째 chunk 이미지 업로드 실패: ${response.status}`);
            }
        }
        alert("전체 image 전송 완료");
    };

    return(
    <>
    <div id="container">
        <form onSubmit={handleSubmit} className="w-[10rem]">
            <input type="file" name="images" multiple accept="image/*"></input>
            <button type="submit">등록</button>
        </form>
    </div>
    </>
    );
}