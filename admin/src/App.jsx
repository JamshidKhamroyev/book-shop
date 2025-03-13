import {BrowserRouter, Routes, Route} from 'react-router-dom'
import SideBar from './components/sideBar/sideBar'
import AllBook from './components/allBook/allBook'
import AddBook from './components/addBook/addBook'
import UpdateBook from './components/updateBook/updateBook'
import Comments from './components/coments/comments'
import Blogs from './components/blogs/blogs'
import AddBlog from './components/addBlog/addBlog'
import Load from './components/loader/load'
import Login from './components/login/login'

const App = () => {
  return (
    <BrowserRouter>
      <div className='w-full flex items-start gap-3'>
        <Load />
        <Login />
        <SideBar />
        <Routes>
          <Route path='/' element={<AllBook />}/>
          <Route path='/add' element={<AddBook />}/>
          <Route path='/update/:id' element={<UpdateBook />}/>
          <Route path='/comments' element={<Comments />}/>
          <Route path='/blogs' element={<Blogs />}/>
          <Route path='/add-blog' element={<AddBlog />}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App