import { createBrowserRouter } from 'react-router';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import PaymentPage from './pages/PaymentPage';
import SuccessPage from './pages/SuccessPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import HistoryPage from './pages/HistoryPage';
import NotFoundPage from './pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: HomePage,
  },
  {
    path: '/cart',
    Component: CartPage,
  },
  {
    path: '/payment',
    Component: PaymentPage,
  },
  {
    path: '/success',
    Component: SuccessPage,
  },
  {
    path: '/admin/login',
    Component: AdminLoginPage,
  },
  {
    path: '/admin/dashboard',
    Component: AdminDashboardPage,
  },
  {
    path: '/admin/history',
    Component: HistoryPage,
  },
  {
    path: '*',
    Component: NotFoundPage,
  },
]);