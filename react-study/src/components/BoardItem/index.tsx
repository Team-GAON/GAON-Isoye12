import { useNavigate } from "react-router-dom";

interface Board {
    title:string;
    detail:string;
    createdAt:string;
    category:string;
    author:User;
    id:number;
    likesCount:number;
}

interface User {
    id:number;
    username:string;
    board:Board[]; /* 리스트 안에 담기는 값들이 보드라는 뜻임 */
}

const BoardItem = (props:Board) => { /* props(값들)의 타입을 Board로 정의 */

    const navigation = useNavigate(); /* 네비게이션 훅: 페이지를 움직일 때 사용함 */

  return (
    <div
      style={{
        width: "100%",
        height: "100px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        padding: "14px",
        boxSizing: "border-box",
        cursor:'pointer' /* 커서 올렸을 때 사용자가 인식할 수 있게 함 */
      }}
      onClick={()=>{navigation(`/board/${props.id}`)}} /* 글을 눌렀을 때 디테일로 넘어가게 함 */
    >
        <h1>{props.title}</h1>
        <p>{props.author.username}</p>
        <p>{props.createdAt}</p>
    </div>
  );
};

export default BoardItem;
