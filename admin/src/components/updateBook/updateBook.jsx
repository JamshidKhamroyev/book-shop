import { useEffect, useState } from "react"
import {toast} from 'react-toastify'
import {myaxios} from '../../apiCall/index';
import {useDispatch} from 'react-redux'
import {showLoader, hideLoader} from '../../reducers/loader';
import {useNavigate, useParams} from "react-router-dom"

const UpdateBook = () => {
  const {id} = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [data, setData] = useState({title: "", description: "", price: "", category: "Tarix"})

  const getOneBook = async () => {
    dispatch(showLoader())
    const response = await myaxios.get(`/api/book/get-one/${id}`)
    if(response.data.ok){
      toast.success(response.data.message)
      setData(response.data.data)
    }else{
      toast.error(response.data.message)
    }
    dispatch(hideLoader())
  }
  
  const submitHandler = async event => {
    dispatch(showLoader())
    event.preventDefault()
    if(!data.title || !data.price || !data.description || !data.category){
      dispatch(hideLoader())
      return toast.error("Siz barcha kataklarni to'ldirmadingiz!")
    }
    
    const formData = new FormData()
    formData.append("title", data.title)
    formData.append("description", data.description)
    formData.append("price", data.price)
    formData.append("category", data.category)
    
    const response = await myaxios.put(`/api/book/update/admin213-423423567618-sdniewlask/${id}`, formData,  {
      headers: {
        "Content-Type": "multipart/formdata"
      }
    })
    if(response.data.ok){
      navigate("/")
      setData({title: "", description: "", price: "", category: "Tarix", image: ""})
      toast.success(response.data.message)
    }else{
      toast.error(response.data.message)
    }
    dispatch(hideLoader())
  }

  useEffect(() => {
    getOneBook()
  },[])
  return (
    <form className="md:w-1/2 w-full mx-auto flex flex-col gap-2 items-center max-md:px-2 py-12" onSubmit={submitHandler}>
      <h2 className="md:text-4xl text-3xl font-bold">Kitob qo'shish</h2>

      <div className="w-full flex justify-between items-center gap-2">
        <div className="w-full">
          <label>Kitob nomini kiriting</label>
          <input type="text" value={data.title} onChange={(e) => setData(prev => ({...prev, ["title"]: e.target.value}))} placeholder="Kitob nomini kiriting..." className="w-full py-1 px-3 border rounded-sm"/>
        </div>
        
        <div className="w-full" >
          <label>Categoriyani tanlang!</label>
          <select className="w-full p-1 border" onChange={(e) => setData(prev => ({...prev, ["category"]: e.target.value}))} value={data.category}>
            <option value="Badiiy">Badiiy</option>
            <option value="Ilmiy">Ilmiy</option>
            <option value="Bolalar">Bolalar</option>
            <option value="Biznes">Biznes</option>
            <option value="Psixologiya">Psixologiya</option>
            <option value="Tarix">Tarix</option>
            <option value="Diniy">Diniy</option>
            <option value="Fantastika">Fantastika</option>
          </select>
        </div>
      </div>

      <div className="w-full">
        <label>Kitob haqida yozing!</label>
        <textarea rows={6} value={data.description} onChange={(e) => setData(prev => ({...prev, ["description"]: e.target.value}))} className="w-full p-2 border rounded-sm" placeholder="Kitob haqida!"></textarea>
      </div>

      <div className="w-full">
        <label>Kitob narxini kiriting</label>
        <input type="number" value={data.price} onChange={(e) => setData(prev => ({...prev, ["price"]: e.target.value}))} className="w-full py-1 px-2 border rounded-sm" placeholder="30.000"/>
      </div>

      <button type="submit" className="w-full border p-1 cursor-pointer font-semibold hover:bg-black hover:text-white duration-300 rounded-sm">Qo'shish</button>
    </form>
  )
}

export default UpdateBook