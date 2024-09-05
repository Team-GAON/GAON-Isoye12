import { BrowserRouter, Route, Routes } from "react-router-dom"
import Main from "../Main"
import Signup from "../Signup"

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}/> {/* path="/": 링크 주소 */}
        <Route path="/signup" element={<Signup />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Router