import { useEffect, useState } from "react"
import {myaxios} from '../../apiCall/index'
import {toast} from 'react-toastify'
import moment from 'moment';
import {useDispatch} from 'react-redux'
import {showLoader, hideLoader} from '../../reducers/loader';

const Blogs = () => {
  const [items, setItems] = useState([])
  const dispatch = useDispatch()

  const getAll = async() => {
    dispatch(showLoader())
    const response = await myaxios.get(`/api/blog/get-all`)
    if(response.data.ok){
      setItems(response.data.data)
    }else{
      toast.error(response.data.message)
    }
    dispatch(hideLoader())
  }

  const deleteHandler = async (id) => {
    dispatch(showLoader())
    const response = await myaxios.delete(`/api/blog/delete/${id}/admin213-423423567618-sdniewlask`)
    try {
        if(response.data.ok){
          getAll()
          toast.success(response.data.message)
        }
    } catch (error) {
        toast.error(error.response.data.message)
    }
    dispatch(hideLoader())
  }

  useEffect(() => {
    getAll()
  },[])
  return (
    <div className="md:w-2/3 max-md:px-2">
      <h2 className="text-center md:text-5xl text-2xl font-bold my-12">Barcha bloglar</h2>
       {items.length > 0 ? items.map((item, i) => (
          <div key={i} className="border p-2 w-full">
            <div>
              <img src={`https://book-shop-backend-2i9k.onrender.com/blog-image/${item?.image}`} alt="fs" />
            </div>
            <div className="py-1">
              <h3 className="Itim md:text-4xl text-3xl mb-3">{item?.title}</h3>
              <p>{item?.description}</p>
              <footer className="border-t w-full flex pt-2 opacity-80 md:text-[18px] justify-between items-center px-2">
                <div className="flex gap-2">
                  <p>{moment(item?.createdAt).format("DD-MMMM")}</p>
                  <p>Ko'rganlar soni: {item?.eyes}</p>
                </div>
                <button onClick={() => deleteHandler(item._id)} className="py-1 px-2 hover:bg-red-700 border border-red-700 text-red-700 cursor-pointer rounded-sm hover:text-white duration-300">O'chirish</button>
              </footer>
            </div>
          </div>
       )) : <div className="text-2xl italic text-center">Hozirda bloglar yo'q</div>}
    </div>
  )
}

export default Blogs