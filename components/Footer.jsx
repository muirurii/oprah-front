import Link from "next/link";
import { useContext } from "react";
import { Context } from "../context";

const Footer = () => {
  const {
    state: { menu },
  } = useContext(Context);

  return (
    <footer className="text-gray-200 bg-black font-light mt-16 lg:mt-32">
      <section className="px-5 py-32 mx-auto flex justify-evenly md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <article className="w-64 md:w-96 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <a className="flex font-medium items-center md:justify-start justify-center text-gray-500">
            <h1 className="text-2xl text-secondary font-sec">
              <span className="text-white">O</span>rpah
            </h1>
          </a>
          <p className="mt-4 text-gray-500">
            After nourishment, shelter and companionship, stories are things we
            need most in the world.
          </p>
        </article>
        <article className="w-1/2 flex flex-wrap justify-evenly mx-auto gap-y-8 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          <div className="lw-full px-4">
            <h2 className="font-sec uppercase text-center text-secondary tracking-widest text-md mb-3">
              Quick Links
            </h2>
            <nav className="list-none">
              <li className="text-center">
                <Link href={"/"}>
                  <a className="text-gray-400 hover:text-secondary transition-colors duration-300 mb-2 inline-block">
                    Home
                  </a>
                </Link>
              </li>
              <li className="text-center">
                <Link href={"/about"}>
                  <a className="text-gray-400 hover:text-secondary transition-colors duration-300 mb-2 inline-block">
                    About
                  </a>
                </Link>
              </li>
              <li className="text-center">
                <Link href={"/Contacts"}>
                  <a className="text-gray-400 hover:text-secondary transition-colors duration-300 mb-2 inline-block">
                    Contacts
                  </a>
                </Link>
              </li>
              <li className="text-center">
                <Link href={"/signup"}>
                  <a className="text-gray-400 hover:text-secondary transition-colors duration-300 mb-2 inline-block">
                    Signup
                  </a>
                </Link>
              </li>
              <li className="text-center">
                <Link href={"/login"}>
                  <a className="text-gray-400 hover:text-secondary transition-colors duration-300 mb-2 inline-block">
                    Log In
                  </a>
                </Link>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/3 md:w-1/2 w-full px-4">
            <h2 className="font-sec uppercase text-center text-secondary tracking-widest text-md mb-3">
              Blogs
            </h2>
            <nav className="list-none mb-10">
              <li className="text-center">
                <Link href={"/fashion"}>
                  <a className="text-gray-400 hover:text-secondary transition-colors duration-300 mb-2 inline-block">
                    All blogs
                  </a>
                </Link>
              </li>
              <li className="text-center">
                <Link href={"/fashion"}>
                  <a className="text-gray-400 hover:text-secondary transition-colors duration-300 mb-2 inline-block">
                    Fashion
                  </a>
                </Link>
              </li>
              <li className="text-center">
                <Link href={"/technology"}>
                  <a className="text-gray-400 hover:text-secondary transition-colors duration-300 mb-2 inline-block">
                    Technology
                  </a>
                </Link>
              </li>
              <li className="text-center">
                <Link href={"/lifestyle"}>
                  <a className="text-gray-400 hover:text-secondary transition-colors duration-300 mb-2 inline-block">
                    Lifestyle
                  </a>
                </Link>
              </li>
            </nav>
          </div>
        </article>
      </section>
      <section
        className={`bg-white z-50 ${
          false
            ? "fixed bottom-0 w-screen translate-x-full origin-right banner"
            : null
        }`}
      >
        <article className="py-2 px-5">
          <p className="flex items-center justify-center text-black md:text-left">
            <span>Crafted by</span>
            <a
              className="inline-block ml-2 text-secondary overflow-hidden relative my-link
                after:absolute after:-left-2 after:bottom-0 after:h-[1px] after:bg-secondary after:w-full
                after:-z-20"
              href="https://peterngugi.netlify.app "
              target="_blank "
            >
              Peter
            </a>
          </p>
        </article>
      </section>
    </footer>
  );
};

export default Footer;
