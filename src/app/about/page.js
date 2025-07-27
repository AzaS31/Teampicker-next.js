"use client";

import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
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
                <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>About</h1>
                <p>
                    This project is a free tool to randomly select FIFA 25 teams for fun and fair gameplay.
                    Created by a football fan for other fans.
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
