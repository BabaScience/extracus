import React from 'react';
import { ChunkedFileUpload } from './components/ChunkedFileUpload';
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 dark:text-white">
      <Header />
      <main className="flex-grow">
        <Hero />
        <HowItWorks />
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">
              Upload Your Media
            </h2>
            <ChunkedFileUpload />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;