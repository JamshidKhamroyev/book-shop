import { useEffect, useState } from 'react';
import {NavLink} from 'react-router-dom'

const links = [
  { to: '/', label: 'Barcha Kitoblar', icon: 'fa-book' },
  { to: '/add', label: "Kitob qo'shish", icon: 'fa-plus' },
  { to: '/comments', label: 'Fikralr', icon: 'fa-comments' },
  { to: '/blogs', label: 'Bloglar', icon: 'fa-newspaper' },
  { to: '/add-blog', label: 'Blog Yaratish', icon: 'fa-pen' },
];

const SideBar = () => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const linkss = document.querySelectorAll(".linkss")
    linkss.forEach(item => (
      item.addEventListener("click", () => {
        setOpen(false)
      })
    ))
  },[])
  return (
    <>
    <div className='md:hidden block'>
      <i className="fa-solid fa-bars absolute top-2 md:hidden block right-2 z-[3] text-2xl cursor-pointer" onClick={() => setOpen(prev => !prev)}></i>
    </div>
      <section className={`md:w-[30vw] w-[100vw] max-md:z-[2] max-md:shadow-2xl max-md:py-5 duration-500 max-md:bg-white max-md:absolute md:min-h-[100vh] min-h-[30vh] flex justify-center items-start border-r border-e-gray-300 ${open ? "top-0" : "-top-[200vh]"}`}>
        <div className="w-full p-4 flex flex-col gap-3">
            {links.map((link, index) => (
                <NavLink 
                    key={index} 
                    to={link.to} 
                    className="flex linkss gap-2 items-center md:p-4 rounded-sm p-2 border text-2xl font-semibold cursor-pointer"
                >
                    <i className={`fa-solid ${link.icon}`}></i>
                    <p>{link.label}</p>
                </NavLink>
            ))}
        </div>
      </section>
    </>
  )
}

export default SideBar