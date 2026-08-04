import {useParams} from 'react-router-dom';
import {Link} from 'react-router-dom';

function CardListPage() {
    const {boxid} = useParams();
    console.log(boxid);
    
    /*
    개발용 코드
    메가드림 한박스의 정보만 읽어온다.
    */
    const imageModules = import.meta.glob(
        '../../assets/M2a/*.webp',
        {
            eager: true,
            import: "default",
        });

    const images = Object.entries(imageModules)
        .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
        .map(([path, url]) => ({
            name: path.split("/").pop(),
            url,
        }));

    /*
    *   
    기능 
    1.필터 추가하기
    2.카드 클릭시 상세페이지로 이동
    */


    return(
    <>  
    <div className="container mx-auto m-4">
        <div className="grid grid-cols-6 gap-4">
            {images.map((img) => (
                <Link to={`/cards/${img.name}`} key={img.name}>
                <img
                    key={img.name}
                    src={img.url}
                    alt={img.name}
                    className="w-full"
                />
                </Link>
            ))}
        </div>
    </div>
    </>
    )
}

export default CardListPage;