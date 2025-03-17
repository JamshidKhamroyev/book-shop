import { useDispatch, useSelector } from "react-redux"
import Moon from '../../assets/moon.webp'
import { Myaxios } from "../../apikeys"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import moment from "moment/moment"
import Book from '../../assets/book.webp'
import { useNavigate } from "react-router-dom"
import { hideLoader, showLoader } from "../../reducers/loader"

const NewBooks = () => {
    const {mode} = useSelector(state => state.mode)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [books, setBooks] = useState([])

    const getAllBooks = async () => {
        try {
            const response = await Myaxios.get(`/api/book/get-all`)
            if(response.data.ok){
                setBooks(response.data.data.slice(0, 3))
            }else{
                toast.error(response.data.message)
            }
        } catch (error) {
            return error.message
        }
    }

    const clickHandler = async (id) => {
        dispatch(showLoader())
        try {
          const response = await Myaxios.put(`/api/book/add-eyes/${id}`)
          if(response.data.ok){
            navigate(`/book/${id}`)
          }
        } catch (error) {
            toast.error(error.response.data.message)            
        }
        dispatch(hideLoader())
      }

    useEffect(() => {
        getAllBooks()
    },[])
  return (
    <section className={`${mode ? "navy" : "nav"} py-12`}>
         <div className="text-center py-3 Itim">
            <h2 className="md:text-4xl text-3xl font-semibold">Yangi Nashrlar</h2>
            <h4 className="md:text-3xl text-2xl">Siz uchun tanlab olingan eng yangi adabiy asarlar!</h4>
        </div>

        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 py-5">
            {books.map((book, i) => (
                <div className="border p-2 cursor-pointer" key={i} onClick={() => clickHandler(book._id)}>
                    <div className="w-full h-[50vh]">
                        <img src={Book} alt={Moon} className="w-full h-full"/>
                    </div>

                    <div className="">
                        <h2 className="text-2xl Itim">{book?.title}</h2>
                        <p>{book?.description}</p>
                        <footer className="flex text-xl opacity-80 justify-between items-center w-full border-t mt-2 py-2">
                            <p>{moment(book?.createdAt).format("DD-MMMM")}</p>
                            <p>{book?.price}.000 so'm</p>
                        </footer>
                    </div>
                </div>
            ))}
        </div>
    </section>
  )
}

export default NewBooks