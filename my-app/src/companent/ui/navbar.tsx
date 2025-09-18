import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="flex gap-4 py-2">
            <Link href="/">home</Link>
            <Link href="/about">about</Link>
            <Link href="/contact">contact</Link>
            <Link href="/admin" > admin</Link>
            </nav>
    );
}