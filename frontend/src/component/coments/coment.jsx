import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setInfo } from "../../reducers/info"
import { Myaxios } from "../../apikeys"
import { toast } from "react-toastify"
import moment from "moment"
import { hideLoader, showLoader } from "../../reducers/loader"

const Coment = () => {
  const {mode} = useSelector(state => state.mode)
  const {info} = useSelector(state => state.info)
  const dispatch = useDispatch()
  const [data, setData] = useState({userTitle: "", text: "", rating: ""})
  const [open, setOpen] = useState(3)

  const onChangeHandler = event => {
    const val = event.target.value
    const name = event.target.name
    setData(prev => ({...prev, [name]: val}))
  }

  const getInfo = async () => {
    dispatch(showLoader())
    try {
        const response = await Myaxios.get(`/api/site/get-one`)
        if(response.data.ok){
          dispatch(setInfo(response.data.data))
        }else{
          toast.error(response.data.message)
        }
    } catch (error) {
      console.log(error.message); 
    }
    dispatch(hideLoader())
  }

  const settingPage = () => {
    if(open > info.comments.length){
      setOpen(prev => prev - 4)
    }else{
      setOpen(prev => prev + 4)
    }
  }

  const submitHandler = async event => {
    dispatch(showLoader())
    event.preventDefault()
    const {userTitle, text, rating} = data
    if(!userTitle || !text || !rating){
      return toast.error("Siz barcha kataklarni to'ldirmadingiz!")
    }
    const response = await Myaxios.post(`/api/coment/create`, data)
    if(response.data.ok){
      toast.success(response.data.message)
      setData({userTitle: "", text: "", rating: ""})
      getInfo()
    }else{
      toast.error(response.data.message)
    }
    dispatch(hideLoader())
  }

  useEffect(() => {
    getInfo()
  },[])
  return (
    <section className={`${mode ? "navy" : "nav"} pt-24 pb-12`}>
      <div className="text-center py-3 Itim">
            <h2 className="md:text-4xl text-3xl font-semibold">Kitoblar Haqida Siz Nima Deysiz?</h2>
            <h4 className="md:text-3xl text-2xl">Ushbu asarlar sizga yoqdimi? O‘z taassurotlaringizni izohlarda bo‘lishing!</h4>
        </div>

        <div className="w-full px-2 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2 my-5">
          {info?.comments?.slice(0, open)?.map(item =>(
            <div className="border p-1 flex flex-col justify-between">
              <h2 className="Itim md:text-4xl text-2xl border-b border-gray-500 pb-1">{item?.userTitle}</h2>
              <p className="text-justify py-1 h-[20vh] overflow-hidden">{item?.text}</p>
              <div className="flex w-full justify-between items-center py-2 border-t border-gray-500">
                <p>{moment(item.createdAt).format("DD-MMMM")}</p>
                <div>
                  {[...Array(item?.rating)].map((_, index) => (
                    <i className="fa-solid fa-star text-2xl text-yellow-300"></i>
                  ))}
                </div>
              </div>
          </div>
          ))}
        </div>
        {info?.comments?.length > 0 && (
          <button onClick={settingPage} className={`border py-1 px-6 mx-2 rounded-sm ${mode ? "hover:bg-white hover:text-black" : "hover:bg-black hover:text-white"} duration-300 cursor-pointer`}>{open > info.comments.length ? "Kamroq" : "Yana ko'rish"}</button>
        ) }

        <form className="md:w-1/2 w-full mx-auto items-center flex flex-col gap-4 py-12" onSubmit={submitHandler}>
          <h2 className="md:text-4xl text-2xl">Yangi fikr qo'shish</h2>
          <input onChange={onChangeHandler} value={data.userTitle} name="userTitle" type="text" className="py-2 px-4 w-full outline-none border rounded-sm" placeholder="Ismingizni kiriting!"/>
          <textarea onChange={onChangeHandler} value={data.text} name="text" className="w-full outline-none border rounded-sm p-2" placeholder="Fikringizni yozing.." rows={8}></textarea>
          <select onChange={onChangeHandler} value={data.rating} name="rating" className="w-full p-2 outline-none border">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <button type="submit" className={`border py-1 w-full rounded-sm ${mode ? "hover:bg-white hover:text-black" : "hover:bg-black hover:text-white"} duration-300 cursor-pointer`}>Qo'shish</button>
        </form>
    </section>
  )
}

export default Coment