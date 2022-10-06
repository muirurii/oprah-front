import { useEffect, useContext } from "react";
import fetchData from "../customFunctions/fetch";
import Footer from "./Footer";
import Header from "./Header";
import { setUser } from "../context/actions/userActions";
import { Context } from "../context";

const Layout = ({ children }) => {
  const { dispatch } = useContext(Context);

  useEffect(() => {
    const getToken = async () => {
      try {
        const res = await fetchData("auth", "GET");
        if (res.status === 200) {
          const data = await res.json();
          getUser(data);
        } else {
          throw new Error("Unauthorized");
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getToken();
  }, []);

  const getUser = async (data) => {
    try {
      const res = await fetchData(
        `users/user/u/${data._id}`,
        "GET",
        {},
        data.token
      );

      if (res.status === 200) {
        const data = await res.json();
        setUser(dispatch, data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="overflow-x-hidden font-main pt-20">
      <Header />
      {children}
      <Footer />
    </section>
  );
};

export default Layout;
