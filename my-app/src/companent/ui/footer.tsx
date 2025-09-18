import Link from "next/link";

export default function footer({text}: {text?: string}) {
    return (
        <footer>
            <p>{text}</p> 
        </footer>
    );
}