import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TournamentForm from '@/components/TournamentForm';
import './TournamentPage.css';

export const metadata = {
  title: 'Tournament | Teampicker — Random Teams for FIFA 25',
  description: 'Generate random football teams for FIFA/FC 25 tournaments with up to 32 players. Choose leagues and star ratings for realistic matchups.',
  keywords: [
    'FIFA 25 tournament',
    'team picker',
    'random football teams',
    'FIFA 25 team generator',
    'teampicker tournament',
    'FC 25 randomizer',
    '32 player tournament',
    'случайные команды FIFA',
    'рандомайзер FIFA',
    'турнир фифа25',
    'генератор команд FIFA 25',
    'турнир FC 25',
    'рандомайзер команд',
    'футбольный турнир FIFA',
    'команды для FIFA 25',
    'турнир с друзьями FIFA',
  ],
  alternates: {
    canonical: 'https://teampicker.me/tournament',
  },
  openGraph: {
    title: 'Random Teams for FIFA 25 Tournament | Teampicker',
    description: 'Create random teams for tournaments with 3–32 players using top leagues like Premier League, La Liga, and more.',
    url: 'https://teampicker.me/tournament',
    siteName: 'Teampicker',
    type: 'website',
    locale: 'en_US',
    images: ['https://teampicker.me/images/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FIFA 25 Tournament Team Picker',
    description: 'Perfect tool for FIFA tournaments with friends! Generate random teams with league and star rating filters.',
    images: ['https://teampicker.me/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const TournamentPage = () => {
  return (
    <div className="tournament-page page-wrapper">
      <Header />
      <main className="main-content-tournament">
        <TournamentForm />
      </main>
      <Footer />
    </div>
  );
};

export default TournamentPage;