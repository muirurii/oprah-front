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

const HeaderLink = ({ link, text, handleToggleMenu }) => {
  return (
    <Link onClick={() => handleToggleMenu()} className="" href={link}>
      <a
        className="block py-3 md:py-6 w-full text-center border-b border-slate-400 hover:text-secondary transition-colors duration-300 uppercase
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
    toggleMenu(dispatch, !menu);
  };

  const getGreeting = (username) => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    let greeting;

    if (currentHour >= 5 && currentHour < 12) {
      greeting = `Good morning, ${username}! Rise and shine, time to conquer the day!`;
    } else if (currentHour >= 12 && currentHour < 18) {
      greeting = `Good afternoon, ${username}! Afternoon delight! Ready for some productivity?`;
    } else if (currentHour >= 18 && currentHour < 22) {
      greeting = `Good evening, ${username}! Time to unwind and relax like a boss!`;
    } else {
      greeting = `Hello, ${username}! What adventures await us tonight?`;
    }

    return greeting;
  };

  return (
    <header className="bg-white fixed top-0 text-sm left-0 w-screen z-10 flex items-center justify-between px-3 sm:px-6 lg:px-12 h-[120px]">
      <h1 className="text-3xl  bg-white relative z-50 pl-4 sm:p-0 h-full w-full flex items-center justify-tart text-secondary font-sec">
        <Link href="/">
          <a>
            <span className="text-black">O</span>rpah
          </a>
        </Link>
      </h1>
      <div
        className={`fixed top-[120px] left-0 w-screen transition-all duration-300 origin-top ${
          menu ? "scale-100 opacity-100" : "scale-0 opacity-30"
        } min-h-screen pointer-events-none flex justify-center`}
      >
        <div className="flex max-w-[1500px] w-full h-fit pointer-events-auto">
          <nav className="z-10 w-full border flex justify-center ">
            <ul
              className={`flex flex-col
              items-center justify-between pt-4 w-full bg-white shadow-md border-l-8 md:border-l-[32px] border-secondary shadow-slate-300`}
            >
              <div className="w-full">
                <li className="w-full">
                  <HeaderLink
                    handleToggleMenu={handleToggleMenu}
                    link={"/"}
                    text={"Home"}
                  />
                </li>
                <li className="w-full">
                  <HeaderLink
                    handleToggleMenu={handleToggleMenu}
                    link={"/blogs"}
                    text={"Blogs"}
                  />
                </li>
                <li className="w-full">
                  <HeaderLink
                    handleToggleMenu={handleToggleMenu}
                    link={"/about"}
                    text={"About"}
                  />
                </li>
                <li className="w-full">
                  <HeaderLink
                    handleToggleMenu={handleToggleMenu}
                    link={"/contact"}
                    text={"Contact"}
                  />
                </li>
                {user.isLogged && user.role === "ADMIN" ? (
                  <li className="w-full">
                    <HeaderLink
                      handleToggleMenu={handleToggleMenu}
                      link={"/new"}
                      text={"New Blog"}
                    />
                  </li>
                ) : null}
                {user.isLogged ? (
                  <li className="w-full">
                    <HeaderLink
                      handleToggleMenu={handleToggleMenu}
                      link={"/profile"}
                      text={"Profile"}
                    />
                  </li>
                ) : null}
              </div>
              <div className="w-full h-full flex flex-col justify-evenly items-center p-2 md:p-4">
                <li className="w-full flex items-center justify-evenly py-4 md:py-0">
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
      <section
        className={`flex justify-end items-center gap-x-4 w-full ${
          user.isLogged ? "pr-16" : ""
        }`}
      >
        <div onClick={handleToggleMenu} className="relative z-[4000]">
          {menu ? (
            <BiMenuAltRight className="h-8 w-8 cursor-pointer" />
          ) : (
            <BiMenuAltLeft className="h-8 w-8 cursor-pointer" />
          )}
        </div>
        {user.isLogged ? (
          <li className="group font-light absolute top-1/2 right-4 sm:right-12 z-[60] -translate-y-1/2 flex items-center justify-center gap-x-4">
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
              <div className="hidden group-hover:block absolute text-sm top-full right-0 min-w-[240px] md:min-w-[350px] bg-white border border-secondary rounded">
                <p className="text-center px-2 py-4 font-light bg-secondary text-white">
                  Logged in as {user.username}
                </p>
                <img
                  src={user.profilePic}
                  alt=""
                  className="mx-auto w-16 h-16 md:w-32 md:h-32 rounded-full my-6"
                />
                <p className="p-4 text-center">{getGreeting(user.username)}</p>
                <div className="mt-4 flex justify-evenly gap-x-3 pb-4 px-4">
                  <button
                    onClick={handleLogOut}
                    className="border border-transparent transition-colors duration-300 text-white hover:text-black hover:bg-white hover:border-black
                     bg-slate-700 py-2 px-5 md:py-3 md:px-6 rounded"
                  >
                    Log out
                  </button>
                  <Link href="/profile">
                    <a className="border border-secondary hover:bg-white hover:text-black transition-colors duration-300 bg-secondary py-2 px-5 md:py-3 md:px-6 rounded text-white">
                      Profile
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </li>
        ) : (
          <ul className="a flex items-center justify-center sm:gap-x-4">
            <Link href="/login">
              <a>
                <li
                  className="border border-secondary rounded hidden md:inline-block hover:text-secondary 
                 transition-colors duration-300 py-3 px-6"
                >
                  Log In
                </li>
              </a>
            </Link>
            <Link href="/signup">
              <a>
                <li
                  className=" text-white hover:text-black bg-secondary hover:bg-white border border-secondary rounded
                 transition-colors duration-300 py-2 px-5 md:py-3 md:px-6"
                >
                  Sign Up
                </li>
              </a>
            </Link>
          </ul>
        )}
      </section>
    </header>
  );
};

export default Header;
