import React from 'react' // rafce = ! + enter
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../Login'

const Router = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/login' element={<Login />} /> {/* path='/login' : 서버 주소를 /login으로 했을 때 */}
        </Routes>
    </BrowserRouter>
  )
}

export default Router