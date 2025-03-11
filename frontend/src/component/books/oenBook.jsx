import { useParams } from "react-router-dom"
import {Myaxios} from '../../apikeys/index'
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import moment from "moment/moment"
import Book from '../../assets/book.webp';
import {showLoader, hideLoader} from '../../reducers/loader'
import { useDispatch, useSelector } from "react-redux"

const OneBook = () => {
    const {id} = useParams()
    const {mode} = useSelector(state => state.mode)
    const [book, setBook] = useState({}) 
    const dispatch = useDispatch()

    const formatNumber = (num) => {
        if (num >= 1000000) {
          return (num / 1000000).toFixed(1) + "M";
        } else if (num >= 1000) {
          return (num / 1000).toFixed(1) + "K";
        }
        return num;
      };

    const getOne = async () => {
        dispatch(showLoader())
        const respinse = await Myaxios.get(`/api/book/get-one/${id}`)
        if(respinse.data.ok){
            setBook(respinse.data.data)
        }else{
            toast.error(respinse.data.message)
        }
        dispatch(hideLoader())
    }

    useEffect(() => {
        getOne()
    }, [])
  return (
    <div className={`${mode ? "navy" : "nav"} py-24`}>
         <div className="text-center py-3 Itim">
            <h2 className="md:text-4xl text-3xl font-semibold">Siz tanlagan kitob!</h2>
        </div>

        <div className="border p-2 cursor-pointer">
            <div className="flex max-md:flex-col flex-row justify-between items-start gap-">
                <div className="md:w-1/2 w-full p-2">
                    <img src={Book} alt={book?.title} className="w-full md:max-h-[70vh]"/>
                </div>
                <div className="md:w-1/2 w-full">
                    <h2 className="text-2xl Itim">{book?.title}</h2>
                    <p>{book?.description}</p>
                    <footer className="flex text-xl opacity-80 justify-between items-center w-full border-t mt-2 py-2 px-5">
                        <p>{moment(book?.createdAt).format("DD-MMMM")}</p>
                        <p>{book?.price}.000 so'm</p>
                        <p className="flex gap-1 items-center">
                            <i className="fa-solid fa-eye"></i>
                            <p className="text-xl p-1">{formatNumber(book?.eyes)}</p>
                        </p>
                </footer>
                </div>
            </div>
        </div>
    </div>
  )
}

export default OneBook