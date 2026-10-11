import DragandDrop from "./DragandDrop";

export default function PokemonForm(){
    const apiUrl = "/api/admin/insertPokemon";

    return(
    <>  
        <div className="mx-5 my-3 text-md text-gray-500 font-semibold">포켓몬 데이터 추가</div>
        <DragandDrop apiUrl={apiUrl} />
    </>
    );
}