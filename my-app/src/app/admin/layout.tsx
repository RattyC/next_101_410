// admin layout
import Link from "next/link";
export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <h1>Admin Section</h1>
            <nav>
                <Link href="/admin">Dashboard</Link> |{" "}
                <Link href="/admin/settings">Settings</Link>
            </nav>
            <hr />
            <div>{children}</div>
        </div>
    );
}   