import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MedicoForm } from './pages/MedicoForm';
import DefinirSenhaForm from './pages/DefinirSenhaForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MedicoForm />} />
        <Route path="/definir-senha" element={<DefinirSenhaForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;