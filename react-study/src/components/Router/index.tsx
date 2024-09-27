import { BrowserRouter, Route, Routes } from "react-router-dom"
import Main from "../Main"
import Signup from "../Signup"
import Login from "../Login"
import Write from "../Write"
import BoardDetail from "../BoardDetail"

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}/> {/* path="/": 링크 주소 */}
        <Route path="/signup" element={<Signup />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/write" element={<Write />}/>
        <Route path="/board/:id" element={<BoardDetail />}/> {/* /board:id 이건 변수처럼 쓸 수 있음 */}
      </Routes>
    </BrowserRouter>
  )
}

export default Router