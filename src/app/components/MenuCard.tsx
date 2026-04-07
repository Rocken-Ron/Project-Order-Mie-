import { motion } from 'motion/react';
import { MenuItem } from '../types';
import { formatCurrency } from '../data';
import { ShoppingCart } from 'lucide-react';

interface MenuCardProps {
  item: MenuItem;
  onOrder: (item: MenuItem) => void;
}

export function MenuCard({ item, onOrder }: MenuCardProps) {
  return (
    <motion.div
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-[#FFC107] text-[#D32F2F] px-3 py-1 rounded-full">
          <span className="font-semibold">{item.category}</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-900 mb-1">{item.name}</h3>
        <p className="text-sm text-gray-600 mb-3">{item.description}</p>
        <div className="flex items-center justify-between">
          <div className="text-[#D32F2F] font-bold text-lg">
            {formatCurrency(item.basePrice)}
          </div>
          <motion.button
            onClick={() => onOrder(item)}
            className="bg-[#D32F2F] text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-[#B71C1C] transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingCart size={18} />
            <span>Order</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
