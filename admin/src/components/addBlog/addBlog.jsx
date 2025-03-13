import { useState } from "react"
import Upload from '../../assets/upload.jpg'
import { toast } from "react-toastify"
import {useDispatch} from 'react-redux'
import {showLoader, hideLoader} from '../../reducers/loader';
import { myaxios } from "../../apiCall"

const AddBlog = () => {
  const [data, setData] = useState({title: "", description: "", image: ""})
  const dispatch = useDispatch()

  const submitHandler = async event => {
    event.preventDefault()
    dispatch(showLoader())
    try {
        if(!data.title || !data.image || !data.description){
          dispatch(hideLoader())
          return toast.error("Siz barcha kataklarni to'ldirmadingiz!")
        }
    
        const formData = new FormData()
        formData.append("image", data.image)
        formData.append("title", data.title)
        formData.append("description", data.description)
        const response = await myaxios.post(`/api/blog/create/admin213-423423567618-sdniewlask`, formData)
        if(response.data.ok){
          toast.success(response.data.message)
        }else{
          toast.error(response.data.message)
        }
        setData({title: "", description: "", image: ""})
    } catch (error) {
      setData({title: "", description: "", image: ""})
      toast.error(error.response.data.message)
    }
    dispatch(hideLoader())
  }
  return (
    <form className="md:w-1/2 w-full max-md:px-1 mx-auto py-12 text-center" onSubmit={submitHandler}>
      <h2 className="md:text-4xl text-2xl font-bold mb-4">Blog Qo'shish</h2>
      <div>
        <label htmlFor="image">
          <img src={data.image ? URL.createObjectURL(data.image) : Upload} alt="image" className="w-full h-[300px] border cursor-pointer" />
        </label>
        <input type="file" id="image" hidden onChange={(e) => setData(prev => ({...prev, ["image"]: e.target.files[0]}))}/>
      </div>

        <div className="w-full text-left my-3">
          <label>Blog nomini kiriting</label>
          <input type="text" value={data.title} onChange={(e) => setData(prev => ({...data, ["title"]: e.target.value}))} placeholder="Kitob nomini kiriting..." className="w-full py-1 px-3 border rounded-sm"/>
        </div>

      <div className="w-full text-left my-3">
        <label>Blog haqida yozing!</label>
        <textarea rows={6} value={data.description} onChange={(e) => setData(prev => ({...prev, ["description"]: e.target.value}))} className="w-full p-2 border rounded-sm" placeholder="Kitob haqida!"></textarea>
      </div>
      <button type="submit" className="w-full border p-1 cursor-pointer font-semibold hover:bg-black hover:text-white duration-300 rounded-sm">Qo'shish</button>
    </form>
  )
}

export default AddBlog