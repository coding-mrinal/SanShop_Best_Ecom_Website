import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <CartProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </CartProvider>
  </ThemeProvider>
);
