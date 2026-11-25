import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';

export function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <div className="min-h-screen flex flex-col bg-white text-[#0B1728]">
        <a
          href="#conteudo-principal"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-[#0B1728] focus:text-white focus:px-4 focus:py-2 focus:text-sm focus:rounded-[3px]"
        >
          Ir para o conteúdo principal
        </a>
        <Header />
        <div id="conteudo-principal" className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/privacidade" element={<PrivacyPolicyPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
