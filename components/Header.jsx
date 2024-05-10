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
  BiX,
} from "react-icons/bi";

let smallMenuTimeout;

const HeaderLink = ({ link, text }) => {
  return (
    <Link className="" href={link}>
      <a
        className="block py-6 w-full text-center border-b border-slate-400 hover:text-secondary transition-colors duration-300
      cursor-pointer relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:transition-all after:duration-300 after:pointer-events-none after:bg-secondary after:scale-0 after:origin-center after:hover:scale-100
      
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
      <h1 className="text-3xl  bg-white relative z-50 pl-4 sm:p-0 h-full w-full flex items-center justify-start text-secondary font-sec">
        <Link href="/">
          <a>
            <span className="text-black">O</span>rpah
          </a>
        </Link>
      </h1>
      {/* <nav className="hidden sm:block"> */}
      <div className="fixed top-[120px] left-0 w-screen min-h-screen pointer-events-none flex justify-center">
        <div className="flex max-w-[1500px] w-full h-fit">
          <nav className="z-10 w-full border flex justify-center ">
            <ul
              className={`  h0-[calc(100vh - 120px)] flex flex-col
              items-ceter pt-4 w-full bg-white shadow-md border-l-[32px] border-secondary shadow-slate-600 pointer-events-auto`}
            >
              <li className="w-full py-4 px-2 flex items-center justify-evenly">
                <BiLogoInstagram className="w-12 h-12 cursor-pointer hover:fill-secondary" />
                <BiLogoFacebook className="w-12 h-12 cursor-pointer hover:fill-secondary" />
                <BiLogoTwitter className="w-12 h-12 cursor-pointer hover:fill-secondary" />
                <BiLogoPinterestAlt className="w-12 h-12 cursor-pointer hover:fill-secondary" />
              </li>
              <li className="px-4 py-16">
                <p className="text-secondary font-sec text-6xl text-center">
                  Exploring Worlds Through Words
                </p>
              </li>
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
            </ul>
          </nav>
          <img
            className="w-1/2"
            src="https://images.pexels.com/photos/1449667/pexels-photo-1449667.jpeg?auto=compress&cs=tinysrgb&w=1024"
            alt=""
          />
        </div>
      </div>
      <button
        onClick={handleToggleMenu}
        className="sm:hidden absolute -bottom-8 z-40 h-9 p-1 right-0 rounded-bl bg-white"
      >
        <svg
          className={`h-6 w-8 transition-all duration-300 ${
            menu ? "fill-secondary" : null
          }`}
          style={{ enableBackground: "new 0 0 297 297" }}
          xmlSpace="preserve"
          x="0px"
          y="0px"
          viewBox="0 0 384.97 384.97"
        >
          <g>
            <g id="Menu">
              <path d="M12.03,84.212h360.909c6.641,0,12.03-5.39,12.03-12.03c0-6.641-5.39-12.03-12.03-12.03H12.03    C5.39,60.152,0,65.541,0,72.182C0,78.823,5.39,84.212,12.03,84.212z" />
              <path d="M372.939,180.455H12.03c-6.641,0-12.03,5.39-12.03,12.03s5.39,12.03,12.03,12.03h360.909c6.641,0,12.03-5.39,12.03-12.03    S379.58,180.455,372.939,180.455z" />
              <path d="M372.939,300.758H12.03c-6.641,0-12.03,5.39-12.03,12.03c0,6.641,5.39,12.03,12.03,12.03h360.909    c6.641,0,12.03-5.39,12.03-12.03C384.97,306.147,379.58,300.758,372.939,300.758z" />
            </g>
            <g></g>
            <g></g>
          </g>
        </svg>
      </button>
      <nav
        className={`absolute sm:hidden overflow-hidden top-0 right-0 shadow-gray-100 shadow-md rounded-bl-full 
      ${menu ? "h-screen pt-[100px] px-4 rounded-bl-none" : "h-0"}
       w-screen transition-all duration-500 z-30 bg-white`}
        onClick={() => {
          clearTimeout(smallMenuTimeout);
          smallMenuTimeout = setTimeout(() => {
            handleToggleMenu();
          }, 500);
        }}
      >
        <ul className="grid gap-y-2">
          <li className="border-b border-gray-300 max-w-lg pl-1 pb-1 hover:text-secondary transition-colors duration-300">
            <Link href="/">Home</Link>
          </li>
          <li className="border-b border-gray-300 max-w-lg pl-1 pb-1 hover:text-secondary transition-colors duration-300">
            <Link href="/blogs">Blogs</Link>
          </li>
          <li className="border-b border-gray-300 max-w-lg pl-1 pb-1 hover:text-secondary transition-colors duration-300">
            <Link href="/about">About</Link>
          </li>
          {user.isLogged && user.role === "ADMIN" ? (
            <li className="border-b border-gray-300 max-w-lg pl-1 pb-1 hover:text-secondary transition-colors duration-300">
              <Link href="/new">Add new</Link>
            </li>
          ) : null}
          <li className="border-b border-gray-300 max-w-lg pl-1 pb-1 hover:text-secondary transition-colors duration-300">
            <Link href="/profile">Profile</Link>
          </li>
          {user.isLogged ? (
            <li className="border-b border-gray-300 max-w-lg pl-1 pb-1 hover:text-secondary transition-colors duration-300">
              <button onClick={handleLogOut}>Log out</button>
            </li>
          ) : null}
        </ul>
      </nav>
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
    </header>
  );
};

export default Header;
