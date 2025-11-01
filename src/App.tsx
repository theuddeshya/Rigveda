import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingState from './components/explore/LoadingState';
import PageErrorBoundary from './components/error/PageErrorBoundary';

// Lazy load page components for better performance
const Home = lazy(() => import('./pages/Home'));
const Explore = lazy(() => import('./pages/Explore'));
const Discover = lazy(() => import('./pages/Discover'));
const Learn = lazy(() => import('./pages/Learn'));
const Settings = lazy(() => import('./pages/Settings'));

const App = () => (
  <Router>
    <PageErrorBoundary>
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen bg-vedic-bg"><LoadingState /></div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Suspense>
    </PageErrorBoundary>
  </Router>
);

export default App;
