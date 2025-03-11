import NoPage from '../../assets/not foound.webp'

const NotPage = () => {
  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center">
        <img src={NoPage} alt={NoPage} className="w-full h-full"/>
    </div>
  )
}

export default NotPage