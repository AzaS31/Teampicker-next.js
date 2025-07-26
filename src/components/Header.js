import Link from 'next/link';

export default function Header() {
    return (
        <header className="header">
            <nav className="nav">
                <Link href="/" className="nav-link">Home</Link>
                <Link href="/tournament" className="nav-link">Tournament</Link>
            </nav>
        </header>
    );
}
