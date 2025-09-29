import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Eager-loaded core pages
import HomePage from './components/HomePage.jsx';
import Products from './components/Products.jsx';
import PlaceOrder from './components/PlaceOrder.jsx';
import OrderHistory from './components/OrderHistory.jsx';

// Example of lazy loading for future pages (keep pattern ready)
// const TrackOrder = React.lazy(() => import('./components/TrackOrder.jsx'));

// Simple fallback loader
const Loader = () => (
  <div className="w-full h-screen flex items-center justify-center text-gray-600 font-semibold">
    Loading...
  </div>
);

// Temporary Not Found page (replace with a styled component later)
const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center text-center p-8 bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100">
    <h1 className="text-6xl font-black text-blue-600 mb-4">404</h1>
    <p className="text-gray-700 text-lg mb-6">The page you are looking for was not found.</p>
    <a href="/" className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold shadow hover:from-blue-700 hover:to-blue-800 transition-all">Go Home</a>
  </div>
);

// Smooth scroll to hash targets after route change
const ScrollToHashHandler = () => {
  const location = useLocation();
  React.useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      // slight timeout to allow component layout
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    } else {
      // Scroll to top on normal navigation
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname, location.hash]);
  return null;
};

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}> {/* Enables future lazy components */}
        <ScrollToHashHandler />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/order-history" element={<OrderHistory />} />
          {/* <Route path="/track-order" element={<TrackOrder />} /> */}

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;