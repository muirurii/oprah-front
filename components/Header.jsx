import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { Context } from "../context";
import { toggleMenu } from "../context/actions/menuActions";
import { resetUser } from "../context/actions/userActions";
import fetchData from "../customFunctions/fetch";
import {
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoPinterestAlt,
  BiLogoTwitter,
  BiMenu,
  BiMenuAltLeft,
  BiMenuAltRight,
  BiX,
} from "react-icons/bi";

let smallMenuTimeout;

const HeaderLink = ({ link, text }) => {
  return (
    <Link className="" href={link}>
      <a
        className="block py-3 md:py-6 w-full text-center border-b border-slate-400 hover:text-secondary transition-colors duration-300
      cursor-pointer relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:transition-all after:duration-300 after:pointer-events-none after:bg-secondary after:scale-0 after:origin-center after:hover:scale-100 hover:border-transparent
      "
      >
        {text}
      </a>
    </Link>
  );
};

const Header = () => {
  const {
    state: { user, menu },
    dispatch,
  } = useContext(Context);

  const router = useRouter();

  const handleLogOut = async () => {
    try {
      const res = await fetchData("auth/logout", "GET");
      router.push("/login");
      resetUser(dispatch);
    } catch (error) {}
  };

  const handleToggleMenu = () => {
    toggleMenu(dispatch);
  };

  return (
    <header className="bg-white fixed top-0 text-sm left-0 w-screen z-10 flex items-center justify-between pr-4 sm:px-12 shadow shadow-gray-100 h-[120px]">
      <h1 className="text-3xl  bg-white relative z-50 pl-4 sm:p-0 h-full w-full flex items-center justify-tart text-secondary font-sec">
        <Link href="/">
          <a>
            <span className="text-black">O</span>rpah
          </a>
        </Link>
      </h1>
      <div
        className={`fixed top-[120px] left-0 w-screen transition-all duration-300 origin-top ${
          !menu ? "scale-100 opacity-100" : "scale-0 opacity-30"
        } min-h-screen pointer-events-none flex justify-center`}
      >
        <div className="flex max-w-[1500px] w-full h-fit pointer-events-auto">
          <nav className="z-10 w-full border flex justify-center ">
            <ul
              className={`  h0-[calc(100vh - 120px)] flex flex-col
              items-ceter justify-between pt-4 w-full bg-white shadow-md border-l-8 md:border-l-[32px] border-secondary shadow-slate-300`}
            >
              <div className="w-full">
                <li className="w-full">
                  <HeaderLink link={"/"} text={"Home"} />
                </li>
                <li className="w-full">
                  <HeaderLink link={"blogs"} text={"Blogs"} />
                </li>
                <li className="w-full">
                  <HeaderLink link={"about"} text={"About"} />
                </li>
                <li className="w-full">
                  <HeaderLink link={"about"} text={"Contact"} />
                </li>
                {user.isLogged && user.role === "ADMIN" ? (
                  <li className="w-full">
                    <HeaderLink link={"new"} text={"New Blog"} />
                  </li>
                ) : null}
              </div>
              <div className="w-full h-full flex flex-col justify-evenly items-center gap-y-3 md:gap-y-6 p-2 md:p-4">
                <li className="">
                  <p className="text-secondary font-sec text-3xl md:text-6xl text-center">
                    Exploring Worlds Through Words
                  </p>
                </li>
                <li className="w-full flex items-center justify-evenly">
                  <BiLogoInstagram className="w-6 md:w-12 h-6 md:h-10 cursor-pointer hover:fill-secondary" />
                  <BiLogoFacebook className="w-6 md:w-12 h-6 md:h-10 cursor-pointer hover:fill-secondary" />
                  <BiLogoTwitter className="w-6 md:w-12 h-6 md:h-10 cursor-pointer hover:fill-secondary" />
                  <BiLogoPinterestAlt className="w-6 md:w-12 h-6 md:h-10 cursor-pointer hover:fill-secondary" />
                </li>
              </div>
            </ul>
          </nav>
          <img
            className="hidden md:block w-1/2 object-cover cursor-pointer hover:-translate-x-[1px] hover:translate-y-[1px] "
            src="https://images.pexels.com/photos/1449667/pexels-photo-1449667.jpeg?auto=compress&cs=tinysrgb&w=1024"
            alt=""
          />
        </div>
      </div>
      <div>
        <div onClick={handleToggleMenu} className="relative z-[4000] mr-14">
          {menu ? (
            <BiMenuAltRight className="h-8 w-8 cursor-pointer" />
          ) : (
            <BiMenuAltLeft className="h-8 w-8 cursor-pointer" />
          )}
        </div>
        {user.isLogged ? (
          <li className="group absolute top-1/2 right-4 sm:right-12 z-[60] -translate-y-1/2 flex items-center justify-center gap-x-4">
            <div className="h-9 w-9 flex items-center justify-center text-lg rounded-full border border-black relative after:absolute after:left-0 after:bottom-0 after:h-2 after:w-2 after:bg-secondary after:rounded-full cursor-pointer">
              {user.profilePic.length ? (
                <img
                  src={user.profilePic}
                  alt={user.username}
                  className="h-8 w-8 rounded-full"
                />
              ) : (
                <span className="uppercase">{user.username.slice(0, 2)}</span>
              )}
              <div className="hidden group-hover:block absolute text-sm top-full right-0 min-w-[240px] p-3 bg-white border border-gray-200 rounded">
                <p className="text-center">Logged in as {user.username}</p>
                <div className="mt-4 flex justify-center gap-x-3 font-light">
                  <button
                    onClick={handleLogOut}
                    className="border transition-colors duration-300 hover:text-white hover:bg-secondary border-secondary py-2 px-3 rounded text-xs"
                  >
                    Log out
                  </button>
                  <Link href="/profile">
                    <a className="border border-secondary hover:bg-white hover:text-black transition-colors duration-300 bg-secondary py-2 px-3 rounded text-xs text-white">
                      Profile
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </li>
        ) : (
          <ul className="absolute z-50 bg-white top-0 right-2 sm:right-8 flex items-center h-full">
            <Link href="/login">
              <a>
                <li className="mr-4 text-white hover:text-black bg-secondary hover:bg-white border border-secondary rounded py-2 px-3 transition-colors duration-300">
                  Log In
                </li>
              </a>
            </Link>
            <Link href="/signup">
              <a>
                <li className="mr-4 border border-secondary rounded py-2 px-3 hover:text-secondary transition-colors duration-300">
                  Sign Up
                </li>
              </a>
            </Link>
          </ul>
        )}
      </div>
    </header>
  );
};

export default Header;
