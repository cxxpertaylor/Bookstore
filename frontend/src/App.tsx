import './App.css';
import BooksPage from './pages/BooksPage';
import CartPage from './pages/CartPage';
import CartConfirmPage from './pages/CartConfirmPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import AdminBooksPage from './pages/AdminBooksPage';

function App() {
  return (
    <>
      {/* This is how we do routing (navigation) in React */}
      {/* Set CartProvider as the parent element so that all of the routes can see it. See CartContext.tsx 
          All of these components are the children (type ReactNode) that we see in CartContext.tsx. */}
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<BooksPage />} />
            <Route path="/bookList" element={<BooksPage />} />
            <Route
              path="/cartConfirm/:title/:bookID/:price"
              element={<CartConfirmPage />}
            />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/adminBooks" element={<AdminBooksPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
