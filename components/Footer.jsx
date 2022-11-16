import Link from "next/link";

const Footer = () => {
  return (
    <footer className="text-gray-200 bg-black text-sm font-light">
      <section className="px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <article className="w-64 md:w-96 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <a className="flex font-medium items-center md:justify-start justify-center text-gray-500">
            <h1 className="text-xl text-secondary font-sec">Orpah</h1>
          </a>
          <p className="mt-2 text-sm text-gray-500">
                After nourishment, shelter and companionship, stories are things we need most in the world.
          </p>
        </article>
        <article className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          <div className="lg:w-1/3 md:w-1/2 w-full px-4">
            <h2 className="font-medium text-gray-500 tracking-widest text-md mb-3">
              Quick Links
            </h2>
            <nav className="list-none mb-10">
              <li>
                <Link href={"/"}>
                  <a className="text-gray-400 hover:text-secondary transition-colors duration-300">
                    Home
                  </a>
                </Link>
              </li>
              <li>
                <Link href={"/about"}>
                  <a className="text-gray-400 hover:text-secondary transition-colors duration-300">
                    About
                  </a>
                </Link>
              </li>
              <li>
                <Link href={"/signup"}>
                  <a className="text-gray-400 hover:text-secondary transition-colors duration-300">
                    Signup
                  </a>
                </Link>
              </li>
              <li>
                <Link href={"/login"}>
                  <a className="text-gray-400 hover:text-secondary transition-colors duration-300">
                    Log In
                  </a>
                </Link>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/3 md:w-1/2 w-full px-4">
            <h2 className="font-medium text-gray-500 tracking-widest text-md mb-3">
              Categories
            </h2>
            <nav className="list-none mb-10">
              <li>
                <Link href={"/fashion"}>
                  <a className="text-gray-400 hover:text-secondary transition-colors duration-300">
                    Fashion
                  </a>
                </Link>
              </li>
              <li>
                <Link href={"/technology"}>
                  <a className="text-gray-400 hover:text-secondary transition-colors duration-300">
                    Technology
                  </a>
                </Link>
              </li>
              <li>
                <Link href={"/lifestyle"}>
                  <a className="text-gray-400 hover:text-secondary transition-colors duration-300">
                    Lifestyle
                  </a>
                </Link>
              </li>
            </nav>
          </div>
        </article>
      </section>
      <section className="bg-white">
        <article className="py-2 px-5">
          <p className="flex items-center justify-center text-black md:text-left">
           <span>Crafted by</span>
            <a className="inline-block ml-2 text-secondary overflow-hidden relative z-10 my-link
                after:absolute after:-left-2 after:bottom-0 after:h-[1px] after:bg-secondary after:w-full
                after:-z-20" href="https://peterngugi.netlify.app " target="_blank ">
                    Peter
                </a>
          </p>
        </article>
      </section>
    </footer>
  );
};

export default Footer;
