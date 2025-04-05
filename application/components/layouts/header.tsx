import Link from "next/dist/client/app-dir/link";
import Image from "next/image";

export default function Header() {
    return (
        <header>
            <div
                className={"h-16 bg-black flex items-center gap-4"}>
                <Link href="/login" className={"px-4 py-2"}>
                    <Image src={"/GNUF.svg"} alt="Home" width={80} height={80}/>
                </Link>
                <p>man</p>
            </div>
        </header>
    )
}