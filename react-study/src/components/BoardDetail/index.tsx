import { useParams } from "react-router-dom"
import instance from "../../lids/axios/instance";
import { useEffect, useState } from "react";

interface Board {
    title: string;
    detail: string;
    createdAt: string;
    category: string;
    author: User;
    id: number;
    likesCount: number;
}

interface User {
    id: number;
    username: string;
    board: Board[];
}

const BoardDetail = () => {

    const [board, setBorad] = useState<Board>();
    const params = useParams(); /* 이거 뭔지 알아오기 */

    const boardReq = async () => {
        try{
            const res = await instance.get(`/boards/${params.id}`); /* 아까 라우터에 적은 board:id를 가져온거임 */ 
            if(res){
                setBorad(res.data);
            }
        }catch{
            alert('네트워크 에러')
        }
    }

    useEffect(()=>{
        if (params.id){
            boardReq();
        }
    }, [params.id]) /* 값이 바뀔 때 마다 갱신시켜줌 */

  return (
    <div>
        <h1>{board?.title}</h1> {/* ?를 붙이면 언디파인드일 때도 고려함 */}
        <hr />
        <p>{board?.detail}</p>
        <hr />
        <p>{board?.author.username}</p>
        <hr />
        <p>{board?.createdAt}</p>
    </div>
  )
}

export default BoardDetail