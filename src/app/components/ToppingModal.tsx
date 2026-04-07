import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Plus, Minus } from "lucide-react";
import {
  MenuItem,
  Topping,
  AVAILABLE_TOPPINGS,
} from "../types";
import { formatCurrency } from "../data";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";

interface ToppingModalProps {
  isOpen: boolean;
  onClose: () => void;
  menuItem: MenuItem;
  onConfirm: (selectedToppings: Topping[]) => void;
  initialToppings?: Topping[];
}

export function ToppingModal({
  isOpen,
  onClose,
  menuItem,
  onConfirm,
  initialToppings = [],
}: ToppingModalProps) {
  const [selectedToppings, setSelectedToppings] =
    useState<Topping[]>(initialToppings);

  const toggleTopping = (topping: Topping) => {
    setSelectedToppings((prev) => {
      const isSelected = prev.some((t) => t.id === topping.id);
      if (isSelected) {
        return prev.filter((t) => t.id !== topping.id);
      }
      return [...prev, topping];
    });
  };

  const isToppingSelected = (toppingId: string) => {
    return selectedToppings.some((t) => t.id === toppingId);
  };

  const totalPrice =
    menuItem.basePrice +
    selectedToppings.reduce(
      (sum, topping) => sum + topping.price,
      0,
    );

  const handleConfirm = () => {
    onConfirm(selectedToppings);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-0 right-0 text-gray-500 hover:text-gray-700 z-10"
            aria-label="Close"
          >
            <X size={24} />
          </button>

          <div className="pr-8">
            <DialogTitle className="text-xl font-bold text-gray-900 mb-2">
              {menuItem.name}
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600 mb-4">
              {menuItem.description}
            </DialogDescription>
          </div>

          <div className="mb-6">
            <div className="relative h-40 rounded-xl overflow-hidden">
              <img
                src={menuItem.image}
                alt={menuItem.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-bold text-gray-900 mb-3">
              Pilih Topping:
            </h3>
            <div className="space-y-3">
              {AVAILABLE_TOPPINGS.map((topping) => {
                const isSelected = isToppingSelected(
                  topping.id,
                );
                return (
                  <motion.button
                    key={topping.id}
                    onClick={() => toggleTopping(topping)}
                    className={`w-full p-4 rounded-xl border-2 transition-all flex items-center justify-between ${
                      isSelected
                        ? "border-[#D32F2F] bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          isSelected
                            ? "border-[#D32F2F] bg-[#D32F2F]"
                            : "border-gray-300"
                        }`}
                      >
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-3 h-3 bg-white rounded-full"
                          />
                        )}
                      </div>
                      <span className="font-medium text-gray-900">
                        {topping.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#D32F2F] font-semibold">
                        +{formatCurrency(topping.price)}
                      </span>
                      {isSelected ? (
                        <Minus
                          size={20}
                          className="text-[#D32F2F]"
                        />
                      ) : (
                        <Plus
                          size={20}
                          className="text-gray-400"
                        />
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-50 to-yellow-50 rounded-xl p-4 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-medium">
                Total Harga:
              </span>
              <motion.span
                key={totalPrice}
                initial={{ scale: 1.2, color: "#D32F2F" }}
                animate={{ scale: 1, color: "#1f2937" }}
                className="font-bold text-xl"
              >
                {formatCurrency(totalPrice)}
              </motion.span>
            </div>
          </div>

          <motion.button
            onClick={handleConfirm}
            className="w-full bg-[#D32F2F] text-white py-4 rounded-full font-bold hover:bg-[#B71C1C] transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Tambah ke Keranjang
          </motion.button>
        </div>
      </DialogContent>
    </Dialog>
  );
}