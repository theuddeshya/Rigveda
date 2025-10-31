import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Discover from './pages/Discover';
import Learn from './pages/Learn';
// ...existing code...

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/discover" element={<Discover />} />
      <Route path="/learn" element={<Learn />} />
// ...existing code...
    </Routes>
  </Router>
);

export default App;
