import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { Context } from "../context";
import { resetUser } from "../context/actions/userActions";
import fetchData from "../customFunctions/fetch";

let smallMenuTimeout;

const Header = () => {
  const {
    state: { user },
    dispatch,
  } = useContext(Context);

  const [smallMenu, setSmallMenu] = useState(false);

  const router = useRouter();

  const handleLogOut = async () => {
    try {
      const res = await fetchData("auth/logout", "GET");
      router.push("/login");
      resetUser(dispatch);
    } catch (error) {}
  };

  return (
    <header className="bg-white fixed top-0 text-sm left-0 w-screen z-10 flex items-center justify-between pr-4 sm:px-12 shadow shadow-gray-100 h-[70px]">
      <h1 className="text-2xl font-bold bg-white relative z-50 pl-4 sm:p-0 h-full w-full flex items-center justify-start text-secondary font-sec">
        <Link href="/">
        <a>
          <span className="text-black">O</span>rpah
        </a>
        </Link>
      </h1>
      <nav className="hidden sm:block">
        <ul
          className={`z-10  flex gap-y-1 sm:bg-transparent pr-48 items-center`}
        >
          <li className="mr-4 hover:text-secondary transition-colors duration-300">
            <Link href="/">Home</Link>
          </li>
          <li className="mr-4 relative group">
            <Link href="/blogs">
              <a>
            <span className="hover:text-secondary transition-colors duration-300 cursor-pointer">
              Blogs
            </span>
            </a>
            </Link>
          </li>
          <li className="mr-4 hover:text-secondary transition-colors duration-300">
            <Link href="/about">About</Link>
          </li>
          {user.isLogged && user.role === "ADMIN" ? (
            <li className="w-16 hover:text-secondary transition-colors duration-300">
              <Link href="/new">Add new</Link>
            </li>
          ) : null}
        </ul>
      </nav>
      <button
        onClick={() => setSmallMenu(!smallMenu)}
        onBlur={() => {
          clearTimeout(smallMenuTimeout);
         smallMenuTimeout = setTimeout(() => {
            setSmallMenu(false);
          }, 500);
        }}
        className="sm:hidden absolute -bottom-8 z-40 h-9 p-1 right-4 rounded-br rounded-bl bg-white"
      >
        <svg
          className={`h-7 w-8 transition-all duration-300 ${
            smallMenu ? "fill-secondary" : null
          }`}
          x="0px"
          y="0px"
          viewBox="0 0 297 297"
          style={{ enableBackground: "new 0 0 297 297" }}
          xmlSpace="preserve"
        >
          <g>
            <g>
              <g>
                <path d="M280.214,39.211H16.786C7.531,39.211,0,46.742,0,55.997v24.335c0,9.256,7.531,16.787,16.786,16.787h263.428     c9.255,0,16.786-7.531,16.786-16.787V55.997C297,46.742,289.469,39.211,280.214,39.211z" />
                <path d="M280.214,119.546H16.786C7.531,119.546,0,127.077,0,136.332v24.336c0,9.255,7.531,16.786,16.786,16.786h263.428     c9.255,0,16.786-7.531,16.786-16.786v-24.336C297,127.077,289.469,119.546,280.214,119.546z" />
                <path d="M280.214,199.881H16.786C7.531,199.881,0,207.411,0,216.668v24.335c0,9.255,7.531,16.786,16.786,16.786h263.428     c9.255,0,16.786-7.531,16.786-16.786v-24.335C297,207.411,289.469,199.881,280.214,199.881z" />
              </g>
            </g>
          </g>
        </svg>
      </button>
      <nav className={`absolute overflow-hidden top-0 right-0 shadow-gray-100 shadow-md rounded-bl-full 
      ${smallMenu ? "h-screen pt-[100px] px-4 rounded-bl-none" : "h-0"}
       w-screen transition-all duration-500 z-30 bg-white`} > 
         
      <ul
          className="grid gap-y-2"
        >
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
        ) :(
          <ul
            className="absolute z-50 bg-white top-0 right-2 sm:right-8 flex items-center h-full"
          >
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
        )  }
    </header>
  );
};

export default Header;
