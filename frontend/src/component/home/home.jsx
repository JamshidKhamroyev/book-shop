import { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const Home = () => {
  const {mode} = useSelector(state => state.mode)
  const {info} = useSelector(state => state.info)
  const [search, setSearch] = useState("")
  const navigate = useNavigate()

  const submitHandler = (event) => {
    event.preventDefault()
    navigate(`/books/${search}`)
  }
  return (
    <section className={`${mode ? "navy" : "nav"} relative md:h-[95vh] h-[70vh] flex justify-center items-center`}>
      <img src={`https://book-shop-backend-2i9k.onrender.com/site-image/${info?.home_image}`} alt={`${info?.home_image}`} className=" absolute top-0 left-0  w-full h-full"/>
      <form onSubmit={submitHandler} className="home_inputs py-3 px-3 md:w-1/2 rounded-lg relative text-white">
        <h3 className="text-2xl text-center font-semibold mb-2">Kitoblarni qidiring!</h3>
        <p className="max-md:text-justify text-center">{info?.about_description.slice(0,300)}</p>
        <input type="text" placeholder="kitobingizni qidiring..." className="w-full py-2 px-3 outline-none border rounded-sm mt-2" value={search} onChange={(e) => setSearch(e.target.value)} />
        <i className="fa-solid fa-magnifying-glass absolute bottom-4 right-4 text-3xl cursor-pointer active:opacity-10"></i>
      </form>
    </section>
  )
}

export default Home