import {Routes, Route, BrowserRouter,} from 'react-router-dom'
import Blogs from './component/blogs/blogs'
import Coment from './component/coments/coment'
import Contact from './component/contact/contact'
import Books from './component/books/books'
import Navbar from './component/navbar/navbar'
import Footer from './component/footer/footer'
import Index from './component/home'
import NotPage from './component/notPage/notPage'
import { useEffect } from 'react'
import { Myaxios } from './apikeys'
import { setInfo } from './reducers/info'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import {showLoader, hideLoader} from './reducers/loader'
import OneBook from './component/books/oenBook'
import Load from './component/loader/load'

const App = () => {
  const {load} = useSelector(state => state.load)
  const dispatch = useDispatch()
  useEffect(() => {
    const getInfo = async () => {
      dispatch(showLoader())
      try {
          const response = await Myaxios.get(`/api/site/get-one`)
          if(response.data.ok){
            dispatch(setInfo(response.data.data))
            document.title = await response?.data.data?.title
          }else{
            toast.error(response.data.message)
          }
      } catch (error) {
        console.log(error.message); 
      }
    dispatch(hideLoader())
  }
  getInfo()
  },[])
    return (
      <>
        <BrowserRouter>
            {load && <Load />}
            <Navbar />
            <Routes>
              <Route path='/' element={<Index />}/>
              <Route path='/blogs' element={<Blogs />}/>
              <Route path='/comments' element={<Coment />}/>
              <Route path='/books' element={<Books />}/>
              <Route path='/books/:code' element={<Books />}/>
              <Route path='/book/:id' element={<OneBook />}/>
              <Route path='/contact' element={<Contact />}/>
              <Route path='*' element={<NotPage />}/>
            </Routes>
            <Footer />
        </BrowserRouter>
      </>
    )
}

export default App