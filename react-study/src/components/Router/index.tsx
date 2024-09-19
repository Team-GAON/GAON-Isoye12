import { BrowserRouter, Route, Routes } from "react-router-dom"
import Main from "../Main"
import Signup from "../Signup"
import Login from "../Login"

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}/> {/* path="/": 링크 주소 */}
        <Route path="/signup" element={<Signup />}/>
        <Route path="/Login" element={<Login />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Router