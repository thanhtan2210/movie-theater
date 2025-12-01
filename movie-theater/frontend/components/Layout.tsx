import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background-dark font-display text-white">
      <Header />
      <main className="flex-1 flex flex-col w-full relative">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
