import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { Context } from "../context";
import { resetUser } from "../context/actions/userActions";
import fetchData from "../customFunctions/fetch";

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
      router.push("/");
      resetUser(dispatch);
    } catch (error) {}
  };

  return (
    <header className="bg-white fixed top-0 text-sm left-0 w-screen z-10 flex items-center justify-between px-4 sm:px-12 shadow shadow-gray-100 h-[70px]">
      <h1 className="text-2xl font-bold bg-white h-full w-full flex items-center justify-start text-secondary font-sec">
        <span className="text-black">O</span>prah
      </h1>
      <nav>
        <ul
          onClick={() => setSmallMenu(false)}
          className={`${
            smallMenu ? "translate-y-0 border-l border-t" : " -translate-y-full"
          } -z-10  flex transition-all duration-300 sm:transform-none sm:transition-none flex-col sm:flex-row gap-y-1 bg-white border-gray-300 sm:border-none sm:bg-transparent w-[300px] h-screen sm:h-full sm:w-full p-8 pt-14 sm:p-0 sm:pr-40 absolute z-20 sm:[position:unset] top-full right-0 items-start sm:items-center`}
        >
          <li className="mr-4 hover:text-secondary transition-colors duration-300">
            <Link href="/">Home</Link>
          </li>
          <li className="mr-4 relative group">
            <span className=" hover:text-secondary transition-colors duration-300 cursor-pointer">
              Blogs
            </span>
            <ul className="flex sm:hidden pl-2 py-2 sm:absolute top-[102%] left-0  sm:group-hover:flex flex-col gap-y-1 h-fit sm:p-6 bg-white sm:shadow-md rounded-sm">
              <li className="border-b border-gray-200 hover:border-secondary transition-colors duration-300">
                <Link href="/lifestyle">Lifestyle</Link>
              </li>
              <li className="border-b border-gray-200 hover:border-secondary transition-colors duration-300">
                <Link href="/technology">Technology</Link>
              </li>
              <li className="border-b border-gray-200 hover:border-secondary transition-colors duration-300">
                <Link href="/fashion">Fashion</Link>
              </li>
            </ul>
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
        {user.isLogged ? (
          <li className="group absolute top-1/2 right-12 z-[40] -translate-y-1/2 flex items-center justify-center gap-x-4">
            <div className="h-9 w-9 flex items-center justify-center text-lg rounded-full border border-secondary relative after:absolute after:left-0 after:bottom-0 after:h-2 after:w-2 after:bg-secondary after:rounded-full cursor-pointer">
              <span className="uppercase">{user.username.slice(0, 2)}</span>
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
          <ul
            onClick={() => setSmallMenu(false)}
            className="absolute top-0 right-2 sm:right-8 flex items-center h-full"
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
        )}
      </nav>
      <button
        onClick={() => setSmallMenu(!smallMenu)}
        onBlur={()=>{
          setTimeout(() => {
            setSmallMenu(false);
          }, 50);
        }}
        className="sm:hidden absolute -bottom-8 z-30 h-9 p-1 right-4 rounded-br rounded-bl bg-white"
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
    </header>
  );
};

export default Header;
