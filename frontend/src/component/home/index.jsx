import About from "../about/about"
import Category from "../category/category"
import NewBooks from "../newbooks/newBooks"
import Home from "./home"

const Index = () => {
  return (
    <>
        <Home />
        <About />
        <Category />
        <NewBooks />
    </>
  )
}

export default Index