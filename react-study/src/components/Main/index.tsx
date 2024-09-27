import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BoardItem from "../BoardItem";
import instance from "../../lids/axios/instance";

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

const Main = () => {
  const ACCESS_TOKEN =
    localStorage.getItem(
      "ACCESS_TOKEN"
    ); /* 로컬스토리지에 저장한 ACCESS_TOKEN을 ACCESS_TOKEN(변수명)에 저장함 */
  const [user, setUser] = useState<User>();
  const navigate = useNavigate(); /* 에러 뜨면 그냥 로그인으로 넘김 */
  const [boards, setBorads] = useState<Board[]>(
    []
  ); /* 타입이 보드인 리스트를 받아온다는 의미 */

  const getMe = async () => {
    try {
      const res = await instance.get("/auth/me"/* instance에서 refrash토큰을 받아옴 / https://gaon.cher1shrxd.me 도 자동으로 붙여주는 코드도 포함되어 있음 */);
      // headers: { Authorization: `Bearer ${ACCESS_TOKEN}` }, 이것도 instance에 있기 때문에 삭제해도됨
      /* 스웨거에 get이 있음, 함수 인자 3개 가져오기 가능 */ /* 토큰의 타입을 정해줌 */
      if (res) {
        setUser(res.data);
      }
    } catch (err) {
      navigate("/login"); /* 에러 뜨면 그냥 로그인으로 넘김 */
      console.log(err);
    }
  };

  const getBoard = async () => {
    try {
      const res = await axios.get("https://gaon.cher1shrxd.me/boards");
      if (res) {
        setBorads(res.data);
      }
    } catch {
      alert("네트워크 에러");
    }
  };

  useEffect(() => {
    getMe();
    getBoard();
  }, []);

  return (
    <div style={{ width: "100vw", display: "flex", flexDirection: "column" }}>
      <p>{user ? user.username : "유저가 없습니다."}</p> {/* 삼항연산자 user의 값이 true일 때 */}
      <Link to="/write">글쓰기</Link>
      <div style={{ width: "100%", overflowY: "scroll" }}>
        {
          boards.map((item: Board) => (  /* map을 쓰면 인자 안의 값을 하나하나 Item에 담을 수 있음 */
            <BoardItem
              title={item.title}
              author={item.author}
              createdAt={item.createdAt}
              id={item.id}
              detail={item.detail}
              category={item.detail}
              likesCount={item.likesCount}
              key={item.id}
            />
          ))
        }
      </div>
    </div>
  );
};

export default Main;
