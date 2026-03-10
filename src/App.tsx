import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import WhoWeAre from './components/WhoWeAre';
import Services from './components/Services';
import Publication from './components/Publication';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <WhoWeAre />
        <Services />
        <Publication />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
