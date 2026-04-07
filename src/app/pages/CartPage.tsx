import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';
import { ArrowLeft, ShoppingBag, Trash2 } from 'lucide-react';
import { CartItem } from '../components/CartItem';
import { ToppingModal } from '../components/ToppingModal';
import { useApp } from '../store';
import { formatCurrency } from '../data';
import { CartItem as CartItemType, Topping } from '../types';

export default function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateCartItem } = useApp();
  const [editingItem, setEditingItem] = useState<CartItemType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalPrice = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  const handleEdit = (item: CartItemType) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleUpdateToppings = (selectedToppings: Topping[]) => {
    if (editingItem) {
      const newTotalPrice =
        editingItem.menuItem.basePrice +
        selectedToppings.reduce((sum, topping) => sum + topping.price, 0);

      updateCartItem(editingItem.id, {
        ...editingItem,
        selectedToppings,
        totalPrice: newTotalPrice,
      });
    }
  };

  const handleCheckout = () => {
    navigate('/payment');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-yellow-50 pb-32">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-[#D32F2F] text-white sticky top-0 z-40 shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <motion.button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowLeft size={24} />
          </motion.button>
          <div>
            <h1 className="text-xl font-bold">Keranjang Belanja</h1>
            <p className="text-sm text-red-100">{cart.length} item</p>
          </div>
        </div>
      </motion.header>

      <div className="max-w-3xl mx-auto px-4 py-6">
        {cart.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center"
            >
              <ShoppingBag size={64} className="text-gray-400" />
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Keranjang Kosong
            </h2>
            <p className="text-gray-600 mb-6">
              Yuk, pesan mie favoritmu sekarang!
            </p>
            <motion.button
              onClick={() => navigate('/')}
              className="bg-[#D32F2F] text-white px-6 py-3 rounded-full font-bold hover:bg-[#B71C1C] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Lihat Menu
            </motion.button>
          </motion.div>
        ) : (
          <>
            <AnimatePresence mode="popLayout">
              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onEdit={handleEdit}
                  onRemove={removeFromCart}
                />
              ))}
            </AnimatePresence>

            {/* Price Summary - Sticky at bottom */}
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-2xl z-50"
            >
              <div className="max-w-3xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-700 font-medium">Total Harga:</span>
                  <motion.span
                    key={totalPrice}
                    initial={{ scale: 1.2, color: '#D32F2F' }}
                    animate={{ scale: 1, color: '#1f2937' }}
                    className="text-2xl font-bold"
                  >
                    {formatCurrency(totalPrice)}
                  </motion.span>
                </div>
                <motion.button
                  onClick={handleCheckout}
                  className="w-full bg-[#D32F2F] text-white py-4 rounded-full font-bold hover:bg-[#B71C1C] transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Lanjut ke Pembayaran
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <ToppingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          menuItem={editingItem.menuItem}
          onConfirm={handleUpdateToppings}
          initialToppings={editingItem.selectedToppings}
        />
      )}
    </div>
  );
}
