
import React, { useRef } from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import Layout from './components/Layout';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import SeatSelection from './pages/SeatSelection';
import Payment from './pages/Payment';
import BookingSuccess from './pages/BookingSuccess';
import BookingHistory from './pages/BookingHistory';
import TicketDetail from './pages/TicketDetail';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import Cinemas from './pages/Cinemas';
import Promotions from './pages/Promotions';
import PromotionDetail from './pages/PromotionDetail';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Schedule from './pages/Schedule';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import { AuthProvider, useAuth } from './context/AuthContext';

// ScrollToTop component to handle scroll restoration on route change
const ScrollToTop = () => {
    const { pathname } = useLocation();
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  const nodeRef = useRef(null);

  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        key={location.pathname}
        classNames="fade"
        timeout={300}
        unmountOnExit
        nodeRef={nodeRef}
      >
        <div ref={nodeRef} className="flex-1 flex flex-col w-full">
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/booking/:id" element={<SeatSelection />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/booking-success" element={<BookingSuccess />} />
            
            {/* Protected Routes */}
            <Route path="/history" element={
              <ProtectedRoute>
                <BookingHistory />
              </ProtectedRoute>
            } />
            <Route path="/ticket/:id" element={
              <ProtectedRoute>
                <TicketDetail />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cinemas" element={<Cinemas />} />
            <Route path="/promotions" element={<Promotions />} />
            <Route path="/promotion/:id" element={<PromotionDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </div>
      </CSSTransition>
    </SwitchTransition>
  );
};

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Layout>
          <ScrollToTop />
          <AnimatedRoutes />
        </Layout>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
