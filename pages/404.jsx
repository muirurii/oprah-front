import Link from "next/link"
import Meta from "../components/Meta"

const Custom404 = () => {
  return (
    <main className="h-[400px] flex flex-col gap-4 px-4 text-sm font-light items-center justify-center">
        <Meta title="Not found"/>
        <p>
            The requested page is unavailable, we will be adding more content soon :)
        </p>
        <Link href="/"><a className="border-b border-secondary">Home</a></Link>
    </main>
  )
}

export default Custom404;