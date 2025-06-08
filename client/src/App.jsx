import React from 'react'
import Home from './pages/Home'
import Blog from './pages/Blog'
import {Route,Routes} from 'react-router-dom'
import Layout from './pages/admin/Layout'
import DashBoard from './pages/admin/DashBoard'
import AddBlog from './pages/admin/AddBlog'
import ListBlog from './pages/admin/ListBlog'
import Comments from './pages/admin/Comments'
import Login from './components/admin/Login'
import 'quill/dist/quill.snow.css'
import {Toaster} from 'react-hot-toast'
import { useAppContext } from './context/AppContext'
const App = () => {
  const {token}=useAppContext();
  return (
    <div>
      <Toaster></Toaster>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/blog/:id' element={<Blog/>}></Route>
        <Route path='/admin' element={token ? <Layout></Layout> : <Login></Login>}>
          <Route index element={<DashBoard/>}></Route>
          <Route path='addBlog' element={<AddBlog/>}></Route>
          <Route path='listBlog' element={<ListBlog/>}></Route>
          <Route path='comments' element={<Comments/>}></Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
