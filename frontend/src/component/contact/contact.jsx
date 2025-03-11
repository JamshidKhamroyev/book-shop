import axios from "axios"
import { useState } from "react"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"

const Contact = () => {
  const {mode} = useSelector(state => state.mode)
  const {info} = useSelector(state => state.info)
  const [data, setData] = useState({userTitle: "", text: ""})
  const onChangeHandler = event => {
    const val = event.target.value
    const name = event.target.name
    setData(prev => ({...prev, [name]: val}))
  }

  const submitHandler = async event => {
    event.preventDefault()
    try {
      await axios.post(`https://api.telegram.org/bot${info?.adminChatToken}/sendMessage`, {
      chat_id: info?.adminChatId,
      text: `
Foydalanuvchi ismi: ${data.userTitle}
Foydalanuvchining xabari: 
${data.text} 
      `,
    })
    toast.success("Xabar yuborildio!")
    setData({userTitle: "", text: ""})
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <section className={`w-full px-2 ${mode ? "navy" : "nav"} pt-24 pb-12`}>
        <div className="text-center py-3 Itim">
            <h2 className="md:text-4xl text-3xl font-semibold">Xabar Yuborish Bo‘limi</h2>
            <h4 className="md:text-3xl text-2xl">Bu yerda Telegram botga tez va oson xabar yuborishingiz mumkin!</h4>
        </div>

        <form className="md:w-1/2 w-full mx-auto items-center flex flex-col gap-4 py-12" onSubmit={submitHandler}>
          <h2 className="md:text-2xl text-xl Itim text-center">Savolingiz yoki taklifingiz bormi? Xabaringizni bizning Telegram botga yuboring!</h2>
          <input onChange={onChangeHandler} value={data.userTitle} name="userTitle" type="text" className="py-2 px-4 w-full outline-none border rounded-sm" placeholder="Ismingizni kiriting!"/>
          <textarea onChange={onChangeHandler} value={data.text} name="text" className="w-full outline-none border rounded-sm p-2" placeholder="Fikringizni yozing.." rows={8}></textarea>
          <button type="submit" className={`border py-1 w-full rounded-sm ${mode ? "hover:bg-white hover:text-black" : "hover:bg-black hover:text-white"} duration-300 cursor-pointer`}>Qo'shish</button>
        </form>
    </section>
  )
}

export default Contact