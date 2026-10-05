import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Novels from './pages/Novels';
import Reader from './pages/Reader';
import Games from './pages/Games';
import GamePlayer from './pages/GamePlayer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Novels />} />
          <Route path="novels" element={<Novels />} />
          <Route path="novels/:id/:chapter" element={<Reader />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
