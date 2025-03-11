const Search = ({search, setSearch}) => {
  return (
    <form className="md:w-1/2 w-full mx-auto">
        <div className="w-full relative max-md:px-2">
            <input type="text" className="w-full h-full py-2 px-3 border rounded-sm" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Kitoblarni qidiring.."/>
            <i className="fa-solid fa-magnifying-glass absolute top-2 md:right-2 right-3 text-2xl cursor-pointer active:opacity-20"></i>
        </div>
    </form>
  )
}

export default Search