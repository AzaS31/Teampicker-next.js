import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import Script from "next/script"; 
import GoogleAnalyticsClient from '@/components/GoogleAnalyticsClient';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://teampicker.me"),
  title: 'Teampicker — Random Team Selector / Рандомайзер команд для FIFA 25 (FC 25)',
  description:
    'Select random football teams from Premier League, La Liga, Bundesliga for FIFA 25 (FC 25). Great for playing with friends! | Выбирай случайные команды из АПЛ, Ла Лиги, Бундеслиги для FIFA 25. Идеально для игры с друзьями.',
  keywords: [
    'FIFA',
    'FC 25',
    'FIFA25',
    'FIFA 25',
    'Randomizer FIFA25',
    'Generator FIFA25',
    'Рандомайзер FIFA25',
    'Генератор FIFA25',
    'Случайный выбор команд',
    'Premier League',
    'La Liga',
    'Bundesliga',
    'Teampicker',
    'random team selector',
    'team picker',
    'football randomizer',
    'случайная команда FIFA',
    'рандом команды FC 25',
    'рандомайзер FIFA 25',
    'футбольный генератор команд',
  ],
  openGraph: {
    title: 'Teampicker — Random Team Selector / Рандомайзер для FIFA 25',
    description:
      'Pick random football teams from top leagues like Premier League, La Liga, Bundesliga — perfect for FIFA 25 (FC 25)! | Случайный выбор команд для FIFA 25 — играй с друзьями!',
    url: 'https://teampicker.me',
    siteName: 'Teampicker',
    locale: 'en_US',
    type: 'website',
    images: ['https://teampicker.me/images/screenshot.png'],
  },
  alternates: {
    canonical: 'https://teampicker.me',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Teampicker — Random Team Selector / Рандомайзер для FIFA 25',
    description:
      'Randomly pick teams from Premier League, La Liga, Bundesliga — perfect for FIFA 25 (FC 25)! | Рандомайзер команд для FIFA 25 — играй с друзьями!',
    images: ['https://teampicker.me/images/screenshot.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Google Analytics: добавлено безопасно и асинхронно */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-BHFG50VY5T"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.addEventListener("load", function() {
            setTimeout(function() {
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-BHFG50VY5T', {
                page_path: window.location.pathname,
              });
            }, 3000);
          });
        `}
      </Script>

      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <GoogleAnalyticsClient />
        {children}
      </body>
    </html>
  );
}
