import { useSelector } from "react-redux"
import Moon from '../../assets/moon.webp'
import fixter1 from '../../assets/fixter1.png'
import fixter2 from '../../assets/fixter2.png'

const Footer = () => {
  const date = new Date().getFullYear()
  const {mode} = useSelector(state => state.mode)
  const {info} = useSelector(state => state.info)
  return (
   <>
     <footer className={`${mode ? "navy" : "nav"} pt-12 border-t px-3`}>
          <div className="grid lg:grid-cols-4  sm:grid-cols-2 max-md:gap-8">
          <div>
              <div>
                <img src={mode ? fixter2 : fixter1} alt={fixter2} className="w-full h-[100px]"/>
              </div>
              <p className="text-[18px] my-2">Ushbu loyiha FIXTER kompaniyasining "Online books" tizimiga qarashli hisoblanadi!</p>
            </div>

            <div className="flex flex-col gap-2 justify-center items-center">
              <h2 className="text-2xl">Texnologiyalar</h2>
              <a href="/">React js</a>
              <a href="/">Tailwind Css</a>
              <a href="/">Mongo Db</a>
              <a href="/">Node Js</a>
            </div>

            <div className="flex flex-col gap-2 justify-center items-center">
              <h2 className="text-2xl">Admin</h2>
              <a target="_ablank" href={info?.adminTme}>Telegramm</a>
              <a target="_ablank" href={info?.adminIns}>Instagramm</a>
              <a href={`tel:${info?.adminNumber}`}>Number</a>
              <a href={`mailto:${info?.adminEmail}`}>Email</a>
            </div>

            <div className="flex flex-col gap-2 justify-center items-center">
              <h2 className="text-2xl">Guruhlarimiz</h2>
              <a target="_ablank" href={info?.comunityTme}>Telegamm</a>
              <a target="_ablank" href={info?.comunityIns}>Instagramm</a>
              <a target="_ablank" href={info?.comunityYouTube}>You Tube</a>
              <a target="_ablank" href={info?.comunityFacebook}>Facebook</a>
            </div>
          </div>
          <div className="text-center py-5 border-t">
            Copyright © {date} Fixter. All rights reserved.
          </div>
        </footer>
   </>
  )
}

export default Footer