import Home from './pages/Home';
import { Header } from './components/ui/header';
import { Footer } from './components/ui/footer';

function App() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <Home />
      <Footer />
    </div>
  );
}

export default App;