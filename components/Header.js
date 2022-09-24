import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-white shadow-sm shadow-gray-400 py-5 px-4">
      <section className="flex items-center justify-between mx-12">
        <h1 className="text-2xl">blogue</h1>
        <nav>
          <ul className="flex">
            <li className="mr-4 hover:opacity-50">
              <Link href="/">Home</Link>
            </li>
            <li className="mr-4 hover:opacity-50">
              <Link href="/lifestyle">Lifestyle</Link>
            </li>
            <li className="mr-4 hover:opacity-50">
              <Link href="/technology">Technology</Link>
            </li>
            <li className="mr-4 hover:opacity-50">
              <Link href="/fashion">Fashion</Link>
            </li>
            <li className="mr-4 hover:opacity-50">
              <Link href="/politics">Politics</Link>
            </li>
            <li className="mr-4 hover:opacity-50">
              <Link href="/about">About</Link>
            </li>
            <li className="mr-4 hover:opacity-50">
              <Link href="/contacts">Contacts</Link>
            </li>
          </ul>
        </nav>
      </section>
    </header>
  );
};

export default Header;
