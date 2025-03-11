import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import {setInfo} from '../../reducers/info';
import {showLoader, hideLoader} from '../../reducers/loader'
import {Myaxios} from '../../apikeys/index'
import moment from "moment/moment";

const Blogs = () => {
  const {info} = useSelector(state => state.info)
  const {mode} = useSelector(state => state.mode)
  const dispatch = useDispatch()
  useEffect(() => {
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
    getInfo()
  },[])
  return (
    <section className={`${mode ? "navy" : "nav"} pt-24 min-h-[80vh] pb-12`}>
      <div className="text-center py-3 Itim">
            <h2 className="md:text-4xl text-3xl font-semibold">Kitobsevarlar Uchun Blog</h2>
            <h4 className="md:text-3xl text-2xl">Yangi nashrlar, bestsellerlar va o‘qishga arziydigan asarlar haqida maqolalar!</h4>
        </div>

        <div className="w-full px-2 flex flex-col gap-2 items-center justify-center">
          {info?.blogs.map(item => (
            <div key={item.title} className="border p-2">
              <div className="h-[60vh] md:w-[50vw]">
                localhost:2008/blog-image/${item?.image}`} alt="fs" className="h-full w-full" />
              </div>

              <div className="py-1">
                <h3 className="Itim md:text-4xl text-3xl mb-3">{item?.title}</h3>
                <p>{item?.description}</p>
                <footer className="border-t w-full flex pt-2 opacity-80 md:text-[18px] justify-between items-center px-2">
                  <p>{moment(item?.createdAt).format("DD-MMMM")}</p>
                  <p>Ko'rganlar soni: {item?.eyes}</p>
                </footer>
              </div>
            </div>
          ))}
          
          {info?.blogs?.length === 0 && <p className="text-xl">Hozircha bloglar yo'q!</p>}
        </div>
    </section>
  )
}

export default Blogs