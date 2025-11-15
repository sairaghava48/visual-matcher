
import { Product } from '../types';

const products: Product[] = [
  // Electronics
  { id: 'prod-001', name: 'Wireless Headphones', category: 'Electronics', imageUrl: 'https://picsum.photos/seed/prod-001/400/400' },
  { id: 'prod-002', name: 'Smartwatch Series X', category: 'Electronics', imageUrl: 'https://picsum.photos/seed/prod-002/400/400' },
  { id: 'prod-003', name: '4K Ultra HD Monitor', category: 'Electronics', imageUrl: 'https://picsum.photos/seed/prod-003/400/400' },
  { id: 'prod-004', name: 'Mechanical Keyboard', category: 'Electronics', imageUrl: 'https://picsum.photos/seed/prod-004/400/400' },
  { id: 'prod-005', name: 'Portable Bluetooth Speaker', category: 'Electronics', imageUrl: 'https://picsum.photos/seed/prod-005/400/400' },
  { id: 'prod-006', name: 'Gaming Mouse', category: 'Electronics', imageUrl: 'https://picsum.photos/seed/prod-006/400/400' },
  { id: 'prod-007', name: 'Laptop Pro 15-inch', category: 'Electronics', imageUrl: 'https://picsum.photos/seed/prod-007/400/400' },
  { id: 'prod-008', name: 'E-Reader Tablet', category: 'Electronics', imageUrl: 'https://picsum.photos/seed/prod-008/400/400' },
  { id: 'prod-009', name: 'Noise Cancelling Earbuds', category: 'Electronics', imageUrl: 'https://picsum.photos/seed/prod-009/400/400' },
  { id: 'prod-010', name: 'Webcam HD Pro', category: 'Electronics', imageUrl: 'https://picsum.photos/seed/prod-010/400/400' },

  // Apparel
  { id: 'prod-011', name: 'Classic Denim Jacket', category: 'Apparel', imageUrl: 'https://picsum.photos/seed/prod-011/400/400' },
  { id: 'prod-012', name: 'Men\'s Graphic T-Shirt', category: 'Apparel', imageUrl: 'https://picsum.photos/seed/prod-012/400/400' },
  { id: 'prod-013', name: 'Women\'s High-Waist Jeans', category: 'Apparel', imageUrl: 'https://picsum.photos/seed/prod-013/400/400' },
  { id: 'prod-014', name: 'Running Sneakers', category: 'Apparel', imageUrl: 'https://picsum.photos/seed/prod-014/400/400' },
  { id: 'prod-015', name: 'Leather Ankle Boots', category: 'Apparel', imageUrl: 'https://picsum.photos/seed/prod-015/400/400' },
  { id: 'prod-016', name: 'Knit Beanie', category: 'Apparel', imageUrl: 'https://picsum.photos/seed/prod-016/400/400' },
  { id: 'prod-017', name: 'Wool Scarf', category: 'Apparel', imageUrl: 'https://picsum.photos/seed/prod-017/400/400' },
  { id: 'prod-018', name: 'Comfort Hoodie', category: 'Apparel', imageUrl: 'https://picsum.photos/seed/prod-018/400/400' },
  { id: 'prod-019', name: 'Formal Dress Shirt', category: 'Apparel', imageUrl: 'https://picsum.photos/seed/prod-019/400/400' },
  { id: 'prod-020', name: 'Yoga Pants', category: 'Apparel', imageUrl: 'https://picsum.photos/seed/prod-020/400/400' },

  // Home Goods
  { id: 'prod-021', name: 'Ceramic Coffee Mug', category: 'Home Goods', imageUrl: 'https://picsum.photos/seed/prod-021/400/400' },
  { id: 'prod-022', name: 'Modern Desk Lamp', category: 'Home Goods', imageUrl: 'https://picsum.photos/seed/prod-022/400/400' },
  { id: 'prod-023', name: 'Scented Soy Candle', category: 'Home Goods', imageUrl: 'https://picsum.photos/seed/prod-023/400/400' },
  { id: 'prod-024', name: 'Plush Throw Blanket', category: 'Home Goods', imageUrl: 'https://picsum.photos/seed/prod-024/400/400' },
  { id: 'prod-025', name: 'Wooden Bookshelf', category: 'Home Goods', imageUrl: 'https://picsum.photos/seed/prod-025/400/400' },
  { id: 'prod-026', name: 'Minimalist Wall Clock', category: 'Home Goods', imageUrl: 'https://picsum.photos/seed/prod-026/400/400' },
  { id: 'prod-027', name: 'Indoor Planter Pot', category: 'Home Goods', imageUrl: 'https://picsum.photos/seed/prod-027/400/400' },
  { id: 'prod-028', name: 'Ergonomic Office Chair', category: 'Home Goods', imageUrl: 'https://picsum.photos/seed/prod-028/400/400' },
  { id: 'prod-029', name: 'Non-stick Frying Pan', category: 'Home Goods', imageUrl: 'https://picsum.photos/seed/prod-029/400/400' },
  { id: 'prod-030', name: 'Bamboo Cutting Board', category: 'Home Goods', imageUrl: 'https://picsum.photos/seed/prod-030/400/400' },

  // Books
  { id: 'prod-031', name: 'The Sci-Fi Epic', category: 'Books', imageUrl: 'https://picsum.photos/seed/prod-031/400/400' },
  { id: 'prod-032', name: 'A Historical Novel', category: 'Books', imageUrl: 'https://picsum.photos/seed/prod-032/400/400' },
  { id: 'prod-033', name: 'Mystery at the Manor', category: 'Books', imageUrl: 'https://picsum.photos/seed/prod-033/400/400' },
  { id: 'prod-034', name: 'Cookbook for Beginners', category: 'Books', imageUrl: 'https://picsum.photos/seed/prod-034/400/400' },
  { id: 'prod-035', name: 'The Art of Photography', category: 'Books', imageUrl: 'https://picsum.photos/seed/prod-035/400/400' },
  { id: 'prod-036', name: 'Gardening Guide', category: 'Books', imageUrl: 'https://picsum.photos/seed/prod-036/400/400' },
  { id: 'prod-037', name: 'Collected Poems', category: 'Books', imageUrl: 'https://picsum.photos/seed/prod-037/400/400' },
  { id: 'prod-038', name: 'Fantasy World Saga', category: 'Books', imageUrl: 'https://picsum.photos/seed/prod-038/400/400' },
  { id: 'prod-039', name: 'Biography of a Visionary', category: 'Books', imageUrl: 'https://picsum.photos/seed/prod-039/400/400' },
  { id: 'prod-040', name: 'Self-Help & Motivation', category: 'Books', imageUrl: 'https://picsum.photos/seed/prod-040/400/400' },
  
  // Accessories
  { id: 'prod-041', name: 'Leather Wallet', category: 'Accessories', imageUrl: 'https://picsum.photos/seed/prod-041/400/400' },
  { id: 'prod-042', name: 'Canvas Backpack', category: 'Accessories', imageUrl: 'https://picsum.photos/seed/prod-042/400/400' },
  { id: 'prod-043', name: 'Aviator Sunglasses', category: 'Accessories', imageUrl: 'https://picsum.photos/seed/prod-043/400/400' },
  { id: 'prod-044', name: 'Stainless Steel Water Bottle', category: 'Accessories', imageUrl: 'https://picsum.photos/seed/prod-044/400/400' },
  { id: 'prod-045', name: 'Travel Mug', category: 'Accessories', imageUrl: 'https://picsum.photos/seed/prod-045/400/400' },
  { id: 'prod-046', name: 'Silk Tie', category: 'Accessories', imageUrl: 'https://picsum.photos/seed/prod-046/400/400' },
  { id: 'prod-047', name: 'Digital Watch', category: 'Accessories', imageUrl: 'https://picsum.photos/seed/prod-047/400/400' },
  { id: 'prod-048', name: 'Laptop Sleeve', category: 'Accessories', imageUrl: 'https://picsum.photos/seed/prod-048/400/400' },
  { id: 'prod-049', name: 'Key Organizer', category: 'Accessories', imageUrl: 'https://picsum.photos/seed/prod-049/400/400' },
  { id: 'prod-050', name: 'Fitness Tracker Band', category: 'Accessories', imageUrl: 'https://picsum.photos/seed/prod-050/400/400' },
  { id: 'prod-051', name: 'Baseball Cap', category: 'Accessories', imageUrl: 'https://picsum.photos/seed/prod-051/400/400' }
];

export function getProducts(): Product[] {
  return products;
}
