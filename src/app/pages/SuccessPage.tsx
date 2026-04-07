import { useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { CheckCircle, Home } from 'lucide-react';
import { useApp } from '../store';

export default function SuccessPage() {
  const navigate = useNavigate();
  const { currentOrder } = useApp();

  useEffect(() => {
    if (!currentOrder) {
      navigate('/');
    }
  }, [currentOrder, navigate]);

  if (!currentOrder) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-yellow-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="max-w-md w-full"
      >
        <div className="bg-white rounded-3xl p-8 shadow-2xl text-center">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
            className="w-24 h-24 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center"
          >
            <CheckCircle size={64} className="text-green-500" />
          </motion.div>

          {/* Success Message */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold text-gray-900 mb-2"
          >
            Pembayaran Berhasil! 🎉
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 mb-8"
          >
            Terima kasih telah memesan di WebMie
          </motion.p>

          {/* Order Details */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-red-50 to-yellow-50 rounded-2xl p-6 mb-6"
          >
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Nomor Antrian</p>
                <motion.p
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, type: 'spring' }}
                  className="text-4xl font-bold text-[#D32F2F]"
                >
                  {currentOrder.queueNumber}
                </motion.p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Nomor Meja</p>
                <motion.p
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7, type: 'spring' }}
                  className="text-4xl font-bold text-[#D32F2F]"
                >
                  {currentOrder.tableNumber}
                </motion.p>
              </div>
            </div>
          </motion.div>

          {/* Waiting Message */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-blue-50 rounded-xl p-4 mb-6"
          >
            <p className="text-sm text-gray-700">
              Pesanan Anda sedang diproses. Mohon tunggu di meja nomor{' '}
              <span className="font-bold text-[#D32F2F]">
                {currentOrder.tableNumber}
              </span>
              . Kami akan memanggil nomor antrian Anda.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            onClick={() => navigate('/')}
            className="w-full bg-[#D32F2F] text-white py-4 rounded-full font-bold hover:bg-[#B71C1C] transition-colors flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Home size={20} />
            <span>Kembali ke Beranda</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
