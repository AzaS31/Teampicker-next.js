'use client';

import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactPage() {
    const router = useRouter();

    return (
        <div
            className="page-wrapper"
            style={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                minHeight: '100vh',
                color: '#fff',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backdropFilter: 'blur(4px)',
            }}
        >
            <Header />
            <main
                className="main-content"
                style={{
                    backgroundColor: '#111',
                    borderRadius: '12px',
                    padding: '2rem',
                    maxWidth: '800px',
                    width: '100%',
                    boxShadow: '0 0 30px rgba(0,0,0,0.4)',
                }}
            >
                <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Contact</h1>
                <p style={{ textAlign: 'center' }}>
                    If you would like to get in touch, feel free to email:{' '}
                    <a
                        href="mailto:azamatsalaly@gmail.com"
                        style={{
                            color: '#359000ff',
                            textDecoration: 'none',
                        }}
                    >
                        azamatsalaly@gmail.com
                    </a>
                </p>

                <button
                    onClick={() => router.back()}
                    style={{
                        marginTop: '2rem',
                        padding: '0.8rem 1.5rem',
                        backgroundColor: '#009e1aff',
                        color: '#000',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        display: 'block',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                    }}
                >
                    Back
                </button>
            </main>
            <Footer />
        </div>
    );
}
