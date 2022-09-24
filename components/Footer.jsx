import Link from "next/link"

const Footer = () => {
  return (
    <footer className="flex px-4 py-8 justify-center items-center gap-96 bg-gray-300">
        <ul className="grid gap-x-16 grid-cols-2">
        <li className="text-blue-400">
              <Link href="/lifestyle">Lifestyle</Link>
            </li>
            <li className="text-blue-400">
              <Link href="/">Home</Link>
            </li>
            <li className="text-blue-400">
              <Link href="/fashion">Fashion</Link>
            </li>
            <li className="text-blue-400">
              <Link href="/contacts">Contacts</Link>
            </li>
            <li className="text-blue-400">
              <Link href="/technology">Technology</Link>
            </li>
            <li className="text-blue-400">
              <Link href="/about">About</Link>
            </li>
            <li className="text-blue-400">
              <Link href="/politics">Politics</Link>
            </li>
        </ul>
        <ul>
            <li>Instagram</li>
            <li>WhatsApp</li>
            <li>Twitter</li>
            <li>Facebook</li>
        </ul>
    </footer>
  )
}

export default Footer