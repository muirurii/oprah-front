import Link from "next/link";

const Footer = () => {
  return (
    <footer className="text-gray-200 bg-black">
      <section className="px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <article className="w-64 md:w-96 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
            <h1 className="text-xl text-secondary">blogue</h1>
          </a>
          <p className="mt-2 text-sm text-gray-500">
            Air plant banjo lyft occupy retro adaptogen indego
          </p>
        </article>
        <article className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          <div className="lg:w-1/3 md:w-1/2 w-full px-4">
            <h2 className="font-medium text-gray-900 tracking-widest text-md mb-3">
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
                <Link href={"/contacts"}>
                  <a className="text-gray-400 hover:text-secondary transition-colors duration-300">
                    Contacts
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
            <h2 className="font-medium text-gray-900 tracking-widest text-md mb-3">
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
              <li>
                <Link href={"/politics"}>
                  <a className="text-gray-400 hover:text-secondary transition-colors duration-300">
                    Politics
                  </a>
                </Link>
              </li>
            </nav>
          </div>
        </article>
      </section>
      <section className="bg-gray-200">
        <article className="container mx-auto py-4 px-5 flex items-center sm:justify-between flex-wrap flex-col sm:flex-row">
          <div>
            <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
              <a href="https://" className="text-gray">
                <svg
                  className="fill-secondary w-5 h-5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </a>
              <a href="https://" className="ml-5 text-gray">
                <svg
                  className="fill-secondary w-5 h-5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </a>
              <a href="https://" className="ml-5 text-gray">
                <svg
                  fill="none"
                  className="stroke-secondary w-5 h-5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                </svg>
              </a>
              <a href="https://" className="ml-5 text-gray">
                <svg
                  className="fill-secondary w-5 h-5"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="none"
                    d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                  ></path>
                  <circle cx="4" cy="4" r="2" stroke="none"></circle>
                </svg>
              </a>
            </span>
          </div>
          <p className="text-gray-500 text-center sm:text-left">
            Crafted by{" "}
            <a
              className="underline text-orange-500"
              href="http://peterngugi.netlify.app"
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
