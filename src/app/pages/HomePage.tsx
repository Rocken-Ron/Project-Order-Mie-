import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';
import { ShoppingCart, Filter, Settings } from 'lucide-react';
import { MenuCard } from '../components/MenuCard';
import { ToppingModal } from '../components/ToppingModal';
import { useApp } from '../store';
import { MenuItem, Topping } from '../types';
import { MENU_ITEMS } from '../data';
import { Badge } from '../components/ui/badge';

export default function HomePage() {
  const navigate = useNavigate();
  const { cart, addToCart } = useApp();
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  const categories = ['Semua', ...Array.from(new Set(MENU_ITEMS.map((item) => item.category)))];

  const filteredItems =
    selectedCategory === 'Semua'
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.category === selectedCategory);

  const handleOrder = (item: MenuItem) => {
    setSelectedMenuItem(item);
    setIsModalOpen(true);
  };

  const handleConfirmToppings = (selectedToppings: Topping[]) => {
    if (selectedMenuItem) {
      const totalPrice =
        selectedMenuItem.basePrice +
        selectedToppings.reduce((sum, topping) => sum + topping.price, 0);

      addToCart({
        id: Date.now().toString(),
        menuItem: selectedMenuItem,
        selectedToppings,
        totalPrice,
      });
    }
  };

  const cartItemCount = cart.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-yellow-50">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-[#D32F2F] text-white sticky top-0 z-40 shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">WebMie</h1>
            <p className="text-sm text-red-100">Mie Enak, Cepat & Mudah</p>
          </div>
          <div className="flex items-center gap-3">
            <motion.button
              onClick={() => navigate('/admin/login')}
              className="hidden sm:flex bg-white/20 p-3 rounded-full hover:bg-white/30 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Admin Login"
            >
              <Settings size={20} />
            </motion.button>
            <motion.button
              onClick={() => navigate('/cart')}
              className="relative bg-white/20 p-3 rounded-full hover:bg-white/30 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ShoppingCart size={24} />
              {cartItemCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                  className="absolute -top-1 -right-1 bg-[#FFC107] text-[#D32F2F] rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold"
                >
                  {cartItemCount}
                </motion.div>
              )}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-r from-[#D32F2F] to-[#F44336] text-white py-12 px-4"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold mb-3"
          >
            Selamat Datang di WebMie! 🍜
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-red-100"
          >
            Pesan mie favoritmu dengan topping pilihan!
          </motion.p>
        </div>
      </motion.div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          <Filter size={20} className="text-gray-600 flex-shrink-0" />
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-[#D32F2F] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <MenuCard item={item} onOrder={handleOrder} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Floating Cart Button for Mobile */}
      {cartItemCount > 0 && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => navigate('/cart')}
          className="fixed bottom-6 right-6 bg-[#D32F2F] text-white px-6 py-4 rounded-full shadow-2xl flex items-center gap-3 hover:bg-[#B71C1C] transition-colors lg:hidden z-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ShoppingCart size={24} />
          <span className="font-bold">Lihat Keranjang ({cartItemCount})</span>
        </motion.button>
      )}

      {/* Topping Modal */}
      {selectedMenuItem && (
        <ToppingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          menuItem={selectedMenuItem}
          onConfirm={handleConfirmToppings}
        />
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-600 mb-2">© 2026 WebMie. Semua hak dilindungi.</p>
          <motion.button
            onClick={() => navigate('/admin/login')}
            className="text-[#D32F2F] hover:underline text-sm"
            whileHover={{ scale: 1.05 }}
          >
            Admin Dashboard →
          </motion.button>
        </div>
      </footer>
    </div>
  );
}