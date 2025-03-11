import loader from '../../assets/loader.gif'

const Load = () => {
  return (
    <div className="absolute top-0 z-[10] right-0 w-[100vw] h-[100vh] flex items-center justify-center">
        <img src={loader} alt={loader + "dfs, loader"} className='w-full h-full'/>
    </div>
  )
}

export default Load