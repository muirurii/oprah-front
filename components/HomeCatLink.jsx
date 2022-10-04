import Link from "next/link";

const HomeCatLink = ({text}) => {
  return (
    <li className="border border-gray-100 h-24 w-64 rounded">
        <Link href={`/${text}`}>
            <a className="h-full w-full flex items-center justify-center capitalize">{text}</a>
        </Link>
    </li>
  )
}

export default HomeCatLink;