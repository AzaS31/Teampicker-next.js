import { metadata } from './metadata';

export { metadata };

import TeamSelector from '@/components/TeamSelector';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="page-wrapper">
      <Header />
      <main className="main-content">
        <div className="title">
          <h1>Random FC 25 (FIFA 25) Team Selector</h1>
        </div>
        <TeamSelector />
      </main>
      <Footer />
    </div>
  );
}
