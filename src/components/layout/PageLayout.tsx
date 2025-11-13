import type { ReactNode } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

interface PageLayoutProps {
  children: ReactNode;
  showNavbar?: boolean;
  showFooter?: boolean;
  showSidebar?: boolean;
}

const PageLayout = ({ children, showNavbar = true, showFooter = true, showSidebar = true }: PageLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-vedic-ui text-vedic-text">
      {/* Skip to main content link for keyboard accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-accent-foreground focus:rounded-lg focus:shadow-lg"
      >
        Skip to main content
      </a>
      {showNavbar && <Navbar />}
      {showSidebar && <Sidebar />}
      <main id="main-content" className="flex-1">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default PageLayout;
