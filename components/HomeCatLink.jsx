import Link from "next/link";

const HomeCatLink = ({text}) => {
  return (
    <li className="bg-gray-400 h-24 rounded">
        <Link href={`/${text}`}>
            <a className="bg-red-200 text-white h-full w-full flex items-center justify-center capitalize">{text}</a>
        </Link>
    </li>
  )
}

export default HomeCatLink;