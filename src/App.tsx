import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Career from './pages/Career';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);

    const originalPushState = window.history.pushState;
    window.history.pushState = function(...args) {
      originalPushState.apply(window.history, args);
      handleLocationChange();
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');

      if (anchor && anchor.href && anchor.href.startsWith(window.location.origin)) {
        e.preventDefault();
        const url = new URL(anchor.href);
        window.history.pushState({}, '', url.pathname);
        handleLocationChange();
        window.scrollTo(0, 0);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const renderPage = () => {
    if (currentPath === '/') return <Home />;
    if (currentPath === '/about') return <About />;
    if (currentPath === '/services') return <Services />;
    if (currentPath.startsWith('/services/')) return <ServiceDetail />;
    if (currentPath === '/career') return <Career />;
    if (currentPath === '/blog') return <Blog />;
    if (currentPath === '/contact') return <Contact />;
    if (currentPath === '/admin') return <Admin />;

    return <Home />;
  };

  const isAdminPage = currentPath === '/admin';

  return (
    <div className="min-h-screen bg-slate-900">
      {!isAdminPage && <Header />}
      {renderPage()}
      {!isAdminPage && <Footer />}
    </div>
  );
}

export default App;
