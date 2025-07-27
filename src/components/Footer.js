import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="footer">
            <p>© {new Date().getFullYear()} Teampicker. All rights reserved.</p>
            <nav>
                <ul className="footer-links">
                    <li><Link href="/privacy">Privacy</Link></li>
                    <li><Link href="/about">About</Link></li>
                    <li><Link href="/contact">Contact</Link></li>
                </ul>
            </nav>
        </footer>
    );
}
