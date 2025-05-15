import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import UploadSection from './components/UploadSection';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 dark:text-white">
      <Header />
      <main className="flex-grow">
        <Hero />
        <HowItWorks />
        <UploadSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;