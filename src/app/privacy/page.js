"use client";

import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
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
                <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Privacy Policy</h1>
                <p>
                    We respect your privacy. This website does not collect any personal information such as your name, email address, or payment details.
                </p>

                <p>
                    We only use Google Analytics to understand user behavior on the website. All data is anonymized and used solely for analytical purposes.
                </p>

                <p>
                    By using this website, you agree to our privacy policy. If you have any questions, please contact us through the{' '}
                    <a
                        href="/contact"
                        style={{
                            color: '#359000ff',
                            textDecoration: 'none',
                        }}
                    >
                        contact
                    </a>.
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
                    }}
                >
                    Back
                </button>
            </main>
            <Footer />
        </div>
    );
}
