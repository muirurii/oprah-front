import { useEffect, useState, useContext } from "react";
import fetchData from "../customFunctions/fetch";
import Footer from "./Footer";
import Header from "./Header";
import { setUser } from "../context/actions/userActions";
import { Context } from "../context";
import Router from "next/router";
import Loader from "./Loader";

const Layout = ({ children }) => {
  const { dispatch } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [gettingUser, setGettingUser] = useState(true);

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
        setGettingUser(false);
      }
    };
    getToken();
  }, []);

  useEffect(() => {
    Router.events.on("routeChangeStart", () => {
      setLoading(true);
    });
    Router.events.on("routeChangeComplete", () => {
      setLoading(false);
    });
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
        setGettingUser(false);
      }
    } catch (err) {
      setGettingUser(false);
      console.log(err);
    }
  };

  return !loading && !gettingUser ? (
    <section className="overflow-x-hidden font-main pt-20">
      <Header />
      {children}
      <Footer />
    </section>
  ) : (
    <div className="flex items-center justify-center h-screen w-screen bg-white">
      <Loader/>
    </div>
  );
};

export default Layout;
