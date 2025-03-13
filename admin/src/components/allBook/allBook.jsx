import { useEffect, useState } from "react"
import { myaxios } from "../../apiCall"
import { toast } from "react-toastify"
import moment from 'moment'
import { useNavigate } from "react-router-dom"
import {useDispatch} from 'react-redux'
import {showLoader, hideLoader} from '../../reducers/loader';
import Book from '../../assets/boo.webp'

const AllBook = () => {
  const [books, setBooks] = useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const getAllBook = async () => {
    dispatch(showLoader())
    const response = await myaxios.get(`/api/book/get-all`)
    try {
        if(response.data.ok){
          setBooks(response.data.data)
        }
    } catch (error) {
        toast.error(response.data.message)
    }
    dispatch(hideLoader())
  }

  const deleteBook = async id => {
    dispatch(showLoader())
    const response = await myaxios.delete(`/api/book/delete/admin213-423423567618-sdniewlask/${id}`)
    if(response.data.ok){
      toast.success("Kitob o'chirildi!")
      getAllBook()
    }else{
      toast.error(response.data.message)
    }
    dispatch(hideLoader())
  }

  useEffect(() => {
    getAllBook()
  },[])
  console.log(books);
  return (
    <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 my-5 grid-cols-1 gap-2 py-6 max-md:px-1">
      {books.length > 0 ? books.map((book, i) => (
        <div
          className="border p-2 cursor-pointer md:max-h-[60vh] min-h-[65vh] overflow-y-hidden"
          key={i}
        >
          <div className="w-full h-1/2">
            <img
              src={Book}
              alt={book.title}
              className="w-full h-full"
            />
          </div>
            <div className="">
              <h2 className="text-2xl Itim">{book?.title}</h2>
              <p className="text-justify max-md:h-[16vh] overflow-y-hidden">{book?.description.slice(0, 230)}</p>
              <footer className="flex opacity-80 justify-between items-center w-full border-t mt-2 py-2">
                <div className="flex gap-2 items-center">
                  <p>{moment(book?.createdAt).format("DD-MMMM")}</p>
                  <p>{book?.price}.000 so'm</p>
                  <div className="flex items-center justify-center gap-1">
                    <i className="fa-solid fa-eye"></i>
                    <p>{book?.eyes}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button className="px-1 py-1 border rounded-sm border-yellow-400 hover:bg-yellow-500 hover:text-white duration-200 cursor-pointer active:opacity-50" onClick={() => navigate(`/update/${book._id}`)}>Yangilash</button>
                  <button className="px-1 py-1 border rounded-sm border-red-700 hover:bg-red-700 hover:text-white duration-200 cursor-pointer active:opacity-50" onClick={() => deleteBook(book._id)}>O'chirish</button>
                </div>
              </footer>
            </div>
          </div>
      )) : (
        <div className="text-2xl text-center italic w-full">Hozirda kitoblar yo'q!</div>
      )}
    </div>

  )
}

export default AllBook