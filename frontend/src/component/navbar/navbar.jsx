import { useDispatch, useSelector } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import { setMode } from "../../reducers/mode"
import Moon from '../../assets/moon.png'
import Sun from '../../assets/sun.png'
import { useEffect, useState } from "react"

const Navbar = () => {
    const [active, sertActive] = useState("home")
    const [open, setOpen] = useState(false)
    const {mode} = useSelector(state => state.mode)
    const {info}  = useSelector(state => state.info)
    const dispatch = useDispatch()
    const links = [
        {title: "Bloglar", route: "blogs"},
        {title: "Kitoblar", route: "books"},
        {title:  "Fikrlar", route: "comments"},
        {title: "Bog'lanish", route: "contact"}
    ]

    useEffect(() => {
        const rwdlinks = document.querySelectorAll(".capitalize")
        rwdlinks.forEach(item => {
            item.addEventListener("click", () => {
                setOpen(false)
            })
        })
    },[])
  return (
    <header className={`w-full ${mode ? "navy" : "nav"} py-3 flex border-b justify-between items-center md:px-6 fixed top-0 left-0 z-[3]`}>
        <Link to={"/"} onClick={() => sertActive("home")} className="flex justify-center items-center md:gap-2 gap-1 cursor-pointer">
            <img src={`https://book-shop-backend-2i9k.onrender.com/site-image/${info?.logo}`} alt={"dafelur"} className="w-[50px] rounded-full" />
            <h2 className="text-xl">{info?.title}</h2>
        </Link>

        <ul className={`flex max-md:absolute max-md:flex-col max-md:py-4 duration-300 max-md:justify-center max-md:items-center max-md:w-full max-md:bg-white max-md:text-black ${open ? "top-0" : "-top-[300px]"} gap-2`}>
            <NavLink to={'/'} onClick={() => sertActive("home")} className={`md:text-xl ${active === "home" ? "font-bold" : ""} capitalize`}>Uy</NavLink>
            {links.map(item => (
                <NavLink onClick={() => sertActive(item.title)} key={item.route} to={`/${item.route}`} className={`capitalize md:text-xl ${active === item.title ? "font-bold" : ""}`}>{item.title}</NavLink>
            ))}
             {open && (
                <i className="fa-solid fa-xmark md:hidden text-3xl cursor-pointer z-[18] text-black absolute top-2 right-2" onClick={() => setOpen(prev => !prev)}></i>
            )}
        </ul>
        
        <div className="flex items-center justify-center gap-1">
            <div className="flex items-center justify-center md:hidden">
                {!open && (
                    <i className="fa-solid fa-bars text-3xl cursor-pointer z-[8]" onClick={() => setOpen(prev => !prev)}></i>
                )}
               
            </div>
            <div onClick={() => dispatch(setMode())}>
                {mode ? (
                    <div>
                        <img src={Sun} alt={Sun} className="md:w-[50px] w-[45px] cursor-pointer"/>
                    </div>
                ) : (
                    <div>
                        <img src={Moon} alt={Moon} className="md:w-[50px] w-[45px] cursor-pointer"/>
                    </div>
                )}
            </div>
        </div>
    </header>
  )
}

export default Navbar