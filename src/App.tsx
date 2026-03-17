import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import ScrollEnhancements from './components/ScrollEnhancements';

// Lazy load components below the fold and admin dashboard
const WhoWeAre = lazy(() => import('./components/WhoWeAre'));
const Services = lazy(() => import('./components/Services'));
const Publication = lazy(() => import('./components/Publication'));
const FAQ = lazy(() => import('./components/FAQ'));
const Blog = lazy(() => import('./components/Blog'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const Dashboard = lazy(() => import('./components/Dashboard'));

// Loading fallback
const SectionLoader = () => (
  <div className="flex items-center justify-center py-20">
    <div className="w-8 h-8 border-4 border-brand-gold border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const Website = () => (
  <div className="min-h-screen">
    <ScrollEnhancements />
    <Header />
    <main>
      <Hero />
      <Suspense fallback={<SectionLoader />}>
        <WhoWeAre />
        <Services />
        <Publication />
        <Blog />
        <FAQ />
        <Contact />
      </Suspense>
    </main>
    <Suspense fallback={null}>
      <Footer />
    </Suspense>
  </div>
);

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Website />} />
        <Route 
          path="/admin" 
          element={
            <Suspense fallback={<div className="min-h-screen bg-brand-navy flex items-center justify-center"><div className="w-8 h-8 border-4 border-brand-gold border-t-transparent rounded-full animate-spin"></div></div>}>
              <Dashboard />
            </Suspense>
          } 
        />
        {/* Fallback to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
