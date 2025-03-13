import { useEffect, useState } from "react"
import Book from '../../assets/boo.webp'
import {toast} from 'react-toastify'
import {myaxios} from '../../apiCall/index';
import {useDispatch} from 'react-redux'
import {showLoader, hideLoader} from '../../reducers/loader';

const AddBook = () => {
  const [data, setData] = useState({title: "", description: "", price: "", category: "Tarix"})
  const dispatch = useDispatch()

  const submitHandler = async event => {
    dispatch(showLoader())
    event.preventDefault()
    try {
        if(!data.title || !data.price || !data.description || !data.category){
          dispatch(hideLoader())
          return toast.error("Siz barcha kataklarni to'ldirmadingiz!")
        }
        
        const response = await myaxios.post(`/api/book/create/admin213-423423567618-sdniewlask`, data)
        if(response.data.ok){
          setData({title: "", description: "", price: "", category: "Tarix", image: ""})
          toast.success(response.data.message)
        }else{
          toast.error(response.data.message)
        }
    } catch (error) {
      toast.error(error.response.data.message)
    }
    dispatch(hideLoader())
  }
  return (
    <form className="md:w-1/2 w-full mx-auto flex flex-col gap-2 items-center max-md:px-2 py-12" onSubmit={submitHandler}>
      <h2 className="md:text-4xl text-3xl font-bold">Kitob qo'shish</h2>
      <div className="w-full flex justify-between items-center gap-2">
        <div className="w-full">
          <label>Kitob nomini kiriting</label>
          <input type="text" value={data.title} onChange={(e) => setData(prev => ({...data, ["title"]: e.target.value}))} placeholder="Kitob nomini kiriting..." className="w-full py-1 px-3 border rounded-sm"/>
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

export default AddBook