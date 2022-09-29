import Footer from "./Footer";
import Header from "./Header";

const Layout = ({children}) => {
  return (
    <div className="overflow-x-hidden">
        <Header/>
        {children}
        <Footer/>
    </div>
  )
}

export default Layout