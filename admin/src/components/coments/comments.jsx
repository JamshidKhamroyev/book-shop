import { useEffect, useState } from "react"
import {myaxios} from '../../apiCall/index'
import {toast} from 'react-toastify'
import moment from 'moment'
import {useDispatch} from 'react-redux'
import {showLoader, hideLoader} from '../../reducers/loader';

const Comments = () => {
  const [comments, setCommetns] = useState([])
  const dispatch = useDispatch()

  const getComent = async () => {
    dispatch(showLoader())
    const response = await myaxios.get(`/api/coment/get-all`)
    if(response.data.ok){
      setCommetns(response.data.data)
    }else{
      toast.error(response.data.message)
    }
    dispatch(hideLoader())
  }

  const deleteHandler = async (id) => {
    dispatch(showLoader())
    const response = await myaxios.delete(`/api/coment/delete/${id}/admin213-423423567618-sdniewlask`)
    if(response.data.ok){
      getComent()
      toast.success(response.data.message)
    }else{
      toast.error(response.data.message)
    }
    dispatch(hideLoader())
  }

  useEffect(() => {
    getComent()
  },[])
  return (
        <div className="w-full px-1 grid md:grid-cols-3 sm:grid-cols-2 my-12 grid-cols-1 md:gap-2 gap-6">
          {comments.length > 0 ? comments?.map(item =>(
            <div className="border p-1 min-h-[26vh] flex flex-col justify-between overflow-hidden">
              <h2 className="Itim md:text-4xl text-2xl border-b border-gray-500 pb-1">{item?.userTitle}</h2>
              <p className="text-justify py-1">{item?.text}</p>
              <div className="flex w-full justify-between items-center py-2 border-t border-gray-500">
                <p>{moment(item.createdAt).format("DD-MMMM")}</p>
                <div>
                  {[...Array(item?.rating)].map((_, index) => (
                    <i className="fa-solid fa-star text-2xl text-yellow-300"></i>
                  ))}
                </div>
              </div>
              <button onClick={() => deleteHandler(item._id)} className="py-1 px-6 border rounded-sm cursor-pointer border-red-700 hover:bg-red-700 hover:text-white duration-300">O'chirish</button>
          </div>
          )) : <div className="text-2xl italic text-center">Hozirda birorta ham fikr yo'q!</div>}
        </div>
  )
}

export default Comments