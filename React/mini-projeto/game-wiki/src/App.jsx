import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AgentsDetails from './pages/AgentsDetails';
import PokemonDetails from './pages/PokemonDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/valorant/:id" element={<AgentsDetails />} />
        <Route path="/pokemon/:id" element={<PokemonDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App