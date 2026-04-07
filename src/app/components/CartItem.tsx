import { motion } from 'motion/react';
import { CartItem as CartItemType } from '../types';
import { formatCurrency } from '../data';
import { Edit2, Trash2 } from 'lucide-react';

interface CartItemProps {
  item: CartItemType;
  onEdit: (item: CartItemType) => void;
  onRemove: (itemId: string) => void;
}

export function CartItem({ item, onEdit, onRemove }: CartItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="bg-white rounded-2xl p-4 shadow-md mb-3"
    >
      <div className="flex gap-3">
        <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
          <img
            src={item.menuItem.image}
            alt={item.menuItem.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 mb-1">{item.menuItem.name}</h3>
          <p className="text-sm text-gray-600 mb-2">
            {formatCurrency(item.menuItem.basePrice)}
          </p>
          {item.selectedToppings.length > 0 && (
            <div className="mb-2">
              <div className="flex flex-wrap gap-1">
                {item.selectedToppings.map((topping) => (
                  <span
                    key={topping.id}
                    className="text-xs bg-red-50 text-[#D32F2F] px-2 py-1 rounded-full"
                  >
                    + {topping.name}
                  </span>
                ))}
              </div>
            </div>
          )}
          <div className="text-[#D32F2F] font-bold">
            {formatCurrency(item.totalPrice)}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <motion.button
            onClick={() => onEdit(item)}
            className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Edit2 size={18} />
          </motion.button>
          <motion.button
            onClick={() => onRemove(item.id)}
            className="p-2 bg-red-50 text-[#D32F2F] rounded-lg hover:bg-red-100 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Trash2 size={18} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
