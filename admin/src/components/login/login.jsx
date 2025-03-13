import { useState } from "react"

const Login = () => {
    const [user, setUser] = useState("")
    const [admin, setAdmin] = useState(false)

    const submitHandler = event => {
        event.preventDefault()
        if(user === import.meta.env.VITE_ADMIN_PASSWORD){
            return setAdmin(true)
        }
        setUser("")
        setAdmin(false)
    }
  return (
    <div className={`w-[100vw] ${admin ? "hidden" : "flex"} items-center filter justify-center h-[100vh] absolute top-0 ring-0 overflow-hidden`}>
        <form onSubmit={submitHandler} className="flex flex-col gap-2 w-[300px]">
            <input type="text" className="py-2 outline-none border px-3 rounded-sm" value={user} onChange={e => setUser(e.target.value)} />
            <button type="submit" className="px-6 py-1 border border-gray-400 hover:bg-white rounded-sm hover:text-black cursor-pointer">Kirish</button>
        </form>
    </div>
  )
}

export default Login