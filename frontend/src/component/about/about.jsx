import { useSelector } from "react-redux"
import Moon from '../../assets/moon.webp'

const About = () => {
    const {mode} = useSelector(state => state.mode)
    const {info} = useSelector(state => state.info)
  return (
    <section className={`${mode ? "navy" : "nav"} py-12 md:px-5`}>
        <div className="text-center py-3 Itim">
            <h2 className="md:text-4xl text-3xl font-semibold">O‘qish – ma’naviyat kaliti!</h2>
            <h4 className="md:text-3xl text-2xl">Siz izlagan kitoblar shu yerda!</h4>
        </div>

        <div className="flex md:flex-row flex-col items-start gap-2">
            <div className="w-full p-3">
                <img src={`https://book-shop-backend-2i9k.onrender.com/site-image/${info?.about_image}`} alt={Moon} className="rounded-md w-full h-[60vh]"/>
            </div>

            <div className="w-full p-3">
                <h2 className="md:text-4xl text-3xl Itim font-bold mb-3">Biz Haqimizda!</h2>
                <p className="md:text-xl h-[47vh] overflow-y-scroll text-justify">{info?.about_description}</p>
                <button className={`w-full py-1 border text-xl mt-3 rounded-sm ${mode ? "hover:bg-white hover:text-black" : "hover:bg-black hover:text-white"} duration-300 cursor-pointer`}>Kirish</button>
            </div>
        </div>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-center w-full my-3 gap-2 px-2">
            <div className="border w-full text-center rounded-sm py-2">
                <h3 className="md:text-2xl font-semibold">Barcha kitoblar</h3>
                <p className="text-xl mt-2 font-bold">{info?.books?.length || 0}</p>
            </div>

            <div className="border w-full text-center rounded-sm py-2">
                <h3 className="md:text-2xl font-semibold">Barcha fikrlar</h3>
                <p className="text-xl mt-2 font-bold">{info?.comments?.length || 0}</p>
            </div>

            <div className="border w-full text-center rounded-sm py-2">
                <h3 className="md:text-2xl font-semibold">Barcha foydalanuvchilar</h3>
                <p className="text-xl mt-2 font-bold">2000</p>
            </div>
        </div>
    </section>
  )
}

export default About