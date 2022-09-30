import { useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({children}) => {
  useEffect(() => {
    const getUser = async () => {
      
    }
  }, [])
  
  return (
    <div className="overflow-x-hidden font-main">
        <Header/>
        {children}
        <Footer/>
    </div>
  )
}

export default Layout