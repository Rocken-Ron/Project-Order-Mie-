import { MenuItem } from './types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'mie-1',
    name: 'Mie Ayam Special',
    description: 'Mie kuah dengan potongan ayam dan sayuran segar',
    basePrice: 15000,
    image: 'https://images.unsplash.com/photo-1761125158531-8f7bebde9938?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvbmVzaWFuJTIwbWllJTIwbm9vZGxlcyUyMGJvd2x8ZW58MXx8fHwxNzc1NTY1Mjg4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Favorit',
  },
  {
    id: 'mie-2',
    name: 'Mie Pedas Mantap',
    description: 'Mie kuah pedas dengan level maksimal',
    basePrice: 18000,
    image: 'https://images.unsplash.com/photo-1637024698421-533d83c7b883?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGljeSUyMHJhbWVuJTIwbm9vZGxlcyUyMHNvdXB8ZW58MXx8fHwxNzc1NTY1Mjg4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Pedas',
  },
  {
    id: 'mie-3',
    name: 'Mie Goreng Original',
    description: 'Mie goreng klasik dengan bumbu rahasia',
    basePrice: 16000,
    image: 'https://images.unsplash.com/photo-1761125174582-a1538be4ec19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllZCUyMG5vb2RsZXMlMjBhc2lhbiUyMGZvb2R8ZW58MXx8fHwxNzc1NTY1Mjg5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Goreng',
  },
  {
    id: 'mie-4',
    name: 'Mie Ayam Jamur',
    description: 'Mie kuah dengan ayam dan jamur segar',
    basePrice: 17000,
    image: 'https://images.unsplash.com/photo-1512003867696-6d5ce6835040?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwbm9vZGxlcyUyMGJvd2wlMjBhc2lhbnxlbnwxfHx8fDE3NzU1NjUyODl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Favorit',
  },
  {
    id: 'mie-5',
    name: 'Mie Sayur Sehat',
    description: 'Mie kuah dengan aneka sayuran bergizi',
    basePrice: 14000,
    image: 'https://images.unsplash.com/photo-1759923593745-6302b220d719?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdldGFibGUlMjBub29kbGVzJTIwaGVhbHRoeSUyMGJvd2x8ZW58MXx8fHwxNzc1NTY1MjkwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Sehat',
  },
  {
    id: 'mie-6',
    name: 'Mie Seafood Lezat',
    description: 'Mie kuah dengan udang dan cumi segar',
    basePrice: 22000,
    image: 'https://images.unsplash.com/photo-1768703321790-e09a80a46f2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWFmb29kJTIwbm9vZGxlcyUyMHNvdXAlMjBhc2lhbnxlbnwxfHx8fDE3NzU1NjUyOTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Premium',
  },
];

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
}
