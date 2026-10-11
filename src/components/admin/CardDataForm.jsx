import DragandDrop from "./DragandDrop";

export default function CardDataForm(){
    const apiUrl = "/api/admin/insertCardData";

    return(
    <>  
        <div className="mx-5 my-3 text-md text-gray-500 font-semibold">카드 데이터 추가</div>
        <DragandDrop apiUrl={apiUrl} />
    </>
    );
}