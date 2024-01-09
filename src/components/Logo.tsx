import Image from "next/image";
import Link from "next/link";

interface logoProps {}

export function Logo({}: logoProps) {
    return (
        <Link
            href="/"
        >
            <div className="hidden md:flex items-center gap-x-2 hover:opacity-75 transition">
                <Image
                    src="/logo.svg"
                    alt="logo"
                    height={30}
                    width={30}
                />
                <p className="text-lg pb-1 font-medium text-neutral-700">Taskify</p>
            </div>
        </Link>
    )
}
