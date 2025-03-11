import { useSelector } from "react-redux"

const Category = () => { 
    const {mode} = useSelector(state => state.mode)
    const categories = [
        { title: "Badiiy", subtitle: "Adabiyot olamiga sho‘ng‘ing!" },
        { title: "Ilmiy", subtitle: "Fan va innovatsiyalar haqida!" },
        { title: "Bolalar", subtitle: "Eng qiziqarli ertak va hikoyalar!" },
        { title: "Biznes", subtitle: "Muvaffaqiyat kaliti siz bilan!" },
        { title: "Psixologiya", subtitle: "O‘zingizni va atrofdagilarni tushuning!" },
        { title: "Tarix", subtitle: "O‘tgan asrlardan saboq oling!" },
        { title: "Diniy", subtitle: "Ma’naviyat va ruhiy tarbiya!" },
        { title: "Fantastika", subtitle: "Tasavvuringiz chegarasini kengaytiring!" }
      ];
  return (
    <section className={`w-full ${mode ? "navy" : "nav"} py-5`}>
        <div className="text-center py-3 Itim">
            <h2 className="md:text-4xl text-3xl font-semibold">Turkumlar!</h2>
            <h4 className="md:text-3xl text-2xl">Qiziqishlaringizga mos kitobni tanlang!</h4>
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2 grid-cols-1 items-center p-2">
            {categories.map(item => (
                <div key={item.subtitle} className="border p-3 flex flex-col gap1 items-center justify-center">
                    <h3 className="md:text-2xl text-xl Itim">{item.title}</h3>
                    <p className="text-justify text-xl">{item.subtitle}</p>
                </div>
            ))}
        </div>
    </section>
  )
}

export default Category