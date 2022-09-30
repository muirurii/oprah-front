import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-transparent z-10 relative flex items-center justify-between px-12 shadow shadow-gray-300 h-[70px]">
      <h1 className="text-2xl text-secondary">blogue</h1>
      <nav>
        <ul className="flex">
          <li className="mr-4 hover:text-secondary transition-colors duration-300">
            <Link href="/">Home</Link>
          </li>
          <li className="mr-4 relative group">
            <span className="hover:text-secondary transition-colors duration-300 cursor-pointer">Blogs</span>
            <ul className="hidden absolute top-[102%] left-0  group-hover:flex flex-col gap-2 h-fit p-6 bg-white shadow-md rounded-sm">
              <li className="border-b border-gray-200 hover:border-secondary transition-colors duration-300">
                <Link href="/lifestyle">Lifestyle</Link>
              </li>
              <li className="border-b border-gray-200 hover:border-secondary transition-colors duration-300">
                <Link href="/technology">Technology</Link>
              </li>
              <li className="border-b border-gray-200 hover:border-secondary transition-colors duration-300">
                <Link href="/fashion">Fashion</Link>
              </li>
              <li className="border-b border-gray-200 hover:border-secondary transition-colors duration-300">
                <Link href="/politics">Politics</Link>
              </li>
            </ul>
          </li>
          <li className="mr-4 hover:text-secondary transition-colors duration-300">
            <Link href="/about">About</Link>
          </li>
          <li className="mr-4 hover:text-secondary transition-colors duration-300">
            <Link href="/contacts">Contacts</Link>
          </li>
          <li className="mr-4 hover:text-secondary transition-colors duration-300">
            <Link href="/login">Log In</Link>
          </li>
          <li className="mr-4 hover:text-secondary transition-colors duration-300">
            <Link href="/signup">Sign Up</Link>
          </li>
          <li className="mr-4 hover:text-secondary transition-colors duration-300">
            <Link href="/profile">Profile</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
