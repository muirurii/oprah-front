import Link from "next/link";

const Footer = () => {
  return (
    <footer className="text-gray-200 bg-black">
      <section className="px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <article className="w-64 md:w-96 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-500">
            <h1 className="text-xl text-secondary">Oprah</h1>
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
                <Link href={"/Technology"}>
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
        <article className="container mx-auto py-2 px-5 flex items-center sm:justify-between flex-wrap flex-col sm:flex-row">
          <p className="text-center text-black sm:text-left">
            Crafted by 
            <a
              className="underline ml-1 text-orange-600"
              href="https://peterngugi.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
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
