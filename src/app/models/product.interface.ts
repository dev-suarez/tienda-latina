export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  category: string;
  isActive: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: number;
  items: CartItem[];
  total: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  paymentMethod: 'transfer' | 'bit';
  bitPhoneNumber?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
}

export interface PaymentInfo {
  method: 'transfer' | 'bit';
  bitPhoneNumber?: string;
}