import { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Download, CheckCircle } from 'lucide-react';
import { useApp } from '../store';
import { formatCurrency } from '../data';

export default function PaymentPage() {
  const navigate = useNavigate();
  const { cart, clearCart, addOrder, setCurrentOrder } = useApp();
  const [isProcessing, setIsProcessing] = useState(false);

  const totalPrice = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  const handlePaymentConfirm = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      const queueNumber = Math.floor(Math.random() * 100) + 1;
      const tableNumber = Math.floor(Math.random() * 20) + 1;

      const order = {
        id: Date.now().toString(),
        items: cart,
        totalPrice,
        queueNumber,
        tableNumber,
        status: 'pending' as const,
        timestamp: new Date(),
      };

      addOrder(order);
      setCurrentOrder(order);
      clearCart();
      setIsProcessing(false);
      navigate('/success');
    }, 2000);
  };

  if (cart.length === 0) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-yellow-50">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-[#D32F2F] text-white sticky top-0 z-40 shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <motion.button
            onClick={() => navigate('/cart')}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowLeft size={24} />
          </motion.button>
          <div>
            <h1 className="text-xl font-bold">Pembayaran</h1>
            <p className="text-sm text-red-100">Scan QRIS untuk membayar</p>
          </div>
        </div>
      </motion.header>

      <div className="max-w-md mx-auto px-4 py-8">
        {/* Total Price Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-2xl p-6 mb-6 shadow-lg"
        >
          <div className="text-center">
            <p className="text-gray-600 mb-2">Total Pembayaran</p>
            <motion.p
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="text-4xl font-bold text-[#D32F2F]"
            >
              {formatCurrency(totalPrice)}
            </motion.p>
          </div>
        </motion.div>

        {/* QRIS Code */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="bg-white rounded-2xl p-8 mb-6 shadow-lg"
        >
          <div className="text-center mb-4">
            <h2 className="font-bold text-gray-900 mb-2">Scan QR Code</h2>
            <p className="text-sm text-gray-600">
              Gunakan aplikasi mobile banking atau e-wallet
            </p>
          </div>
          
          <div className="relative bg-gray-100 rounded-xl p-6 mb-4">
            <img
              src="https://images.unsplash.com/photo-1643429158639-635fc142e699?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxciUyMGNvZGUlMjBwYXltZW50JTIwaW5kb25lc2lhfGVufDF8fHx8MTc3NTU2NTM3M3ww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="QRIS Code"
              className="w-full h-auto rounded-lg"
            />
          </div>

          <motion.button
            className="w-full bg-gray-100 text-gray-700 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Download size={20} />
            <span>Download QR Code</span>
          </motion.button>
        </motion.div>

        {/* Payment Instructions */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-blue-50 rounded-2xl p-4 mb-6"
        >
          <h3 className="font-bold text-gray-900 mb-2">Cara Pembayaran:</h3>
          <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
            <li>Buka aplikasi mobile banking atau e-wallet</li>
            <li>Pilih menu Scan QR / QRIS</li>
            <li>Scan kode QR di atas</li>
            <li>Konfirmasi pembayaran</li>
            <li>Klik tombol "Saya Sudah Bayar"</li>
          </ol>
        </motion.div>

        {/* Confirm Payment Button */}
        <motion.button
          onClick={handlePaymentConfirm}
          disabled={isProcessing}
          className={`w-full py-4 rounded-full font-bold transition-colors flex items-center justify-center gap-2 ${
            isProcessing
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#D32F2F] hover:bg-[#B71C1C] text-white'
          }`}
          whileHover={!isProcessing ? { scale: 1.02 } : {}}
          whileTap={!isProcessing ? { scale: 0.98 } : {}}
        >
          {isProcessing ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
              <span>Memproses...</span>
            </>
          ) : (
            <>
              <CheckCircle size={20} />
              <span>Saya Sudah Bayar</span>
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}
