import BoxTitle from "./BoxTitle";

export default function BoxesBlock({series, boxes}){
    return (
        <>
        <div id="boxesblock" className="series-title text-xl text-gray-500 text-center font-bold mt-20">
            {series}
        </div>

        <div id="boxes" className="w-full mt-5 grid grid-cols-3 gap-4 lg:grid-cols-6 lg:gap-8">
            {boxes.map((box) => (
                <BoxTitle key={box.id} box={box} />
            ))}
        </div>
        </>
    );
}