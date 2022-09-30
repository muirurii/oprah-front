import { useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({children}) => {
  useEffect(() => {
    const getUser = async () => {
      
    }
  }, [])
  
  return (
    <section className="overflow-x-hidden font-main">
        <Header/>
        {children}
        <Footer/>
    </section>
  )
}

export default Layout