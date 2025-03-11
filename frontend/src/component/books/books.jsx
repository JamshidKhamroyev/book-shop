import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Search from "./search";
import {Myaxios} from '../../apikeys/index'
import {setInfo} from '../../reducers/info'
import Book from "../../assets/book.webp"
import { hideLoader, showLoader } from "../../reducers/loader";
import { toast } from "react-toastify";

const Books = () => {
  const {code} = useParams()
  const { mode } = useSelector((state) => state.mode);
  const { info } = useSelector((state) => state.info);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [category, setCategory] = useState(""); // Kategoriya tanlash uchun
  const [search, setSearch] = useState(""); // Qidiruv uchun

  const categories = [
    { title: "", subtitle: "Barcha kategoriyalar" }, // Default (hamma kitoblar)
    { title: "Badiiy", subtitle: "Adabiyot olamiga sho‘ng‘ing!" },
    { title: "Ilmiy", subtitle: "Fan va innovatsiyalar haqida!" },
    { title: "Bolalar", subtitle: "Eng qiziqarli ertak va hikoyalar!" },
    { title: "Biznes", subtitle: "Muvaffaqiyat kaliti siz bilan!" },
    { title: "Psixologiya", subtitle: "O‘zingizni va atrofdagilarni tushuning!" },
    { title: "Tarix", subtitle: "O‘tgan asrlardan saboq oling!" },
    { title: "Diniy", subtitle: "Ma’naviyat va ruhiy tarbiya!" },
    { title: "Fantastika", subtitle: "Tasavvuringiz chegarasini kengaytiring!" },
  ];

  useEffect(() => {
      const getInfo = async () => {
          dispatch(showLoader())
          try {
              const response = await Myaxios.get(`/api/site/get-one`)
              if(response.data.ok){
                dispatch(setInfo(response.data.data))
                document.title = await response?.data.data?.title
              }else{
                toast.error(response.data.message)
              }
          } catch (error) {
            console.log(error.message); 
          }
        dispatch(hideLoader())
      }
      getInfo()
      setSearch(code)
  },[])

  const clickHandler = async (id) => {
    dispatch(showLoader())
    try {
      const respinse = await Myaxios.put(`/api/book/add-eyes/${id}`)
      if(respinse.data.ok){
        navigate(`/book/${id}`)
      }
    } catch (error) {
        toast.error(error.response.data.message)            
    }
    dispatch(hideLoader())
  }

  // Qidiruv va kategoriya bo‘yicha filter
  const filteredBooks = info?.books.filter((book) => 
    (category ? book.category === category : true) &&
    (search ? book.title.toLowerCase().includes(search.toLowerCase()) : true)
  );

  return (
    <section className={`${mode ? "navy" : "nav"} pt-24 pb-12`}>
      <div className="text-center py-3 Itim">
        <h2 className="md:text-4xl text-3xl font-semibold">Kitoblar To'plami</h2>
        <h4 className="md:text-3xl text-2xl">
          Eng yangi, eng mashhur va klassik kitoblarni bu yerda toping!
        </h4>
      </div>
      
      <div>
        <Search search={search} setSearch={setSearch} />
      </div>

      {/* Kategoriyalar */}
      <div className="w-full flex items-center justify-start gap-2 md:px-4 mt-4 overflow-scroll pb-2">
        {categories.map((item) => (
          <div
            key={item.title}
            onClick={() => setCategory(item.title)}
            className={`py-2 px-6 rounded-sm border ${
              mode
                ? `${category === item.title ? "bg-white text-black" : ""}`
                : `${category === item.title ? "bg-black text-white" : ""}`
            } ${
              mode
                ? "hover:bg-white hover:text-black"
                : "hover:bg-black hover:text-white"
            } duration-300 cursor-pointer`}
          >
            {item.title === "" ? "Barcha" : item.title}
          </div>
        ))}
      </div>

      {/* Kitoblar ro‘yxati */}
      <div className="w-full grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2 py-6">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book, i) => (
            <div
              className="border p-2 cursor-pointer h-[60vh] overflow-hidden"
              key={i}
              onClick={() => clickHandler(book._id)}
            >
              <div className="w-full h-1/2">
                <img
                  src={Book}
                  alt={book.title}
                  className="w-full h-full"
                />
              </div>

              <div className="">
                <h2 className="text-2xl Itim">{book?.title}</h2>
                <p>{book?.description.slice(0, 230)}</p>
                <footer className="flex text-xl opacity-80 justify-between items-center w-full border-t mt-2 py-2">
                  <p>{moment(book?.createdAt).format("DD-MMMM")}</p>
                  <p>{book?.price}.000 so'm</p>
                </footer>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-xl col-span-full">
            Qidiruv yoki kategoriya bo‘yicha natija topilmadi.
          </p>
        )}
      </div>
    </section>
  );
};

export default Books;
